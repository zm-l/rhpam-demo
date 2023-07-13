import express, { Express, Request, Response } from "express";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import cors from "cors";

const app: Express = express();
const port: number = 5000;

// Create a new Pool instance with your PostgreSQL connection details
const pool: Pool = new Pool({
  user: "wbadmin",
  host: "localhost",
  database: "job_portal",
  password: "wbadmin",
  port: 5432,
});

// Allows requests from any origin (i.e., any domain or host) to access the server's resources
app.use(cors({ origin: "*", methods: ["POST", "GET"] }));
// Adds middleware to parse JSON request bodies. It enables the Express application to automatically
// parse JSON data included in the request body and make it available in the request.body object.
app.use(express.json());

// Registration endpoint
app.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password, group } = req.body;

    // Check if the username already exists in the database
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (existingUser.rows.length > 0) {
      // Username already exists
      return res.status(409).json({ error: "Username already exists" });
    }

    // Hash and salt the password
    const hashedPassword: string = await bcrypt.hash(password, 10);

    // Store username and hashed password in the database
    await pool.query(
      "INSERT INTO users (username, hashedpassword, groups) VALUES ($1, $2, $3)",
      [username, hashedPassword, group]
    );

    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "An error occurred during registration" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists in the database
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (user.rows.length === 0) {
      // User not found
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.rows[0].hashedpassword
    );

    if (!isPasswordValid) {
      // Invalid password
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
