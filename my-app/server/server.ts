import express, { Express, Request, Response } from "express";
import { Pool } from "pg";
import JBPMSecurityManagementRESTAPI from "./JBPMSecurityManagementRESTAPI";
import bcrypt from "bcrypt";
import cors from "cors";

const app: Express = express();
const port: number = 5000;

// Call JBPM API to create the user in Business Central
const jbpmClient = new JBPMSecurityManagementRESTAPI();

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
app.post("/register", async (req, res) => {
  try {
    const { username, password, group } = req.body;
    var role = "admin";
    if (group == "applicant") {
      role = "user";
    }

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
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store username and hashed password in the database
    await pool.query(
      "INSERT INTO users (username, hashedpassword, groups) VALUES ($1, $2, $3)",
      [username, hashedPassword, group]
    );

    // An object representing user data to be sent to the JBPM API
    const jbpmUserData = { name: username };

    // Make a request to the JBPM API to create the user
    // Assign the user's groups and role
    const jbpmResponse = await jbpmClient
      .createUsers(jbpmUserData)
      .then(() =>
        jbpmClient.overrideUserGroups(username, [group, "kie-server"])
      )
      .then(() => jbpmClient.overrideUserRoles(username, [role]))
      .then(() => jbpmClient.changeUserPassword(username, password));

    if (jbpmResponse.status === 200) {
      res.status(200).json({ message: "Registration successful" });
    } else {
      // If there was an error creating the user in Business Central, you might want to roll back the database insertion.
      // For simplicity, we'll keep it simple here.
      console.error("Error creating user in JBPM:", jbpmResponse.data);
      res.status(500).json({ error: "An error occurred during registration" });
    }
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

app.post("/applications", async (req, res) => {
  try {
    const { username, task_id } = req.body;

    // Insert the username and task_id into the application table
    const query = "INSERT INTO application (username, task_id) VALUES ($1, $2)";
    await pool.query(query, [username, task_id]);

    res.status(200).json({ message: "Application inserted successfully" });
  } catch (error) {
    console.error("Error during application insertion:", error);
    res
      .status(500)
      .json({ error: "An error occurred during application insertion" });
  }
});

app.get("/users/:username", async (req, res) => {
  try {
    const { username } = req.params;

    // Query to check if application table contains given username
    // If contain, user has already applied
    const query = "SELECT COUNT(*) FROM application WHERE username = $1";
    const result = await pool.query(query, [username]);

    const count = parseInt(result.rows[0].count);

    var group: String = "admin";

    // Make a request to the JBPM API to get the group of the user
    await jbpmClient
      .getUserGroups(username)
      .then((response) => {
        group = response.data[1].name;
      })
      .then(() => res.status(200).json({ exists: count > 0, group }));
  } catch (error) {
    console.error("Error during username check:", error);
    res.status(500).json({ error: "An error occurred during username check" });
  }
});

app.get("/applications/task", async (req, res) => {
  try {
    const username = req.query.username;

    // Query the application table to retrieve the task_id based on the username
    const query = "SELECT task_id FROM application WHERE username = $1";
    const values = [username];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      // No application found for the provided username
      return res.status(404).json({ error: "Application not found" });
    }

    const taskId = result.rows[0].task_id;

    return res.json({ taskId });
  } catch (error) {
    console.error("Error retrieving task ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
