import Candidate from "./Candidate";

export default interface Application {
  candidate: Candidate;
  email: string;
  position: string;
}
