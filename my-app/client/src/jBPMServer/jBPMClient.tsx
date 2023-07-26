import axios, { AxiosResponse } from "axios";

class jBPMClient {
  private containerId = "Job-Portal_1.0.0-SNAPSHOT";
  private processId = "Job-Portal.hiring";
  private baseUrl: string = "http://localhost/kie-server/services/rest/server";
  private username: string;
  private password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  public resetCredentials() {
    this.username = "";
    this.password = "";
  }

  private getHeaders(): Record<string, string> {
    const authHeader = `Basic ${btoa(`${this.username}:${this.password}`)}`;
    return {
      "Content-Type": "application/json",
      Authorization: authHeader,
    };
  }

  public startProcess(inputData: any): Promise<AxiosResponse> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/containers/${this.containerId}/processes/${this.processId}/instances`;
    return axios.post(url, inputData, { headers });
  }

  public completeTaskInstance(
    taskId: string,
    inputData: any
  ): Promise<AxiosResponse> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/containers/${this.containerId}/tasks/${taskId}/states/completed?auto-progress=true`;
    return axios.put(url, inputData, { headers });
  }

  public getTaskList(): Promise<AxiosResponse> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/queries/tasks/instances/pot-owners`;
    return axios.get(url, { headers });
  }

  public getTaskInstance(taskInstanceId: Number): Promise<AxiosResponse> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/containers/${this.containerId}/tasks/${taskInstanceId}?withInputData=true&withOutputData=true&withAssignments=true`;
    return axios.get(url, { headers });
  }

  public getProcessNodeInstance = async (
    processInstanceId: Number
  ): Promise<AxiosResponse> => {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/containers/${this.containerId}/processes/instances/${processInstanceId}/nodes/instances`;
    return axios.get(url, { headers });
  };

  public getTaskOutput = async (taskName: String): Promise<AxiosResponse> => {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/containers/${this.containerId}/processes/definitions/${this.processId}/tasks/users/${taskName}/outputs`;
    return axios.get(url, { headers });
  };
  // Add more methods for interacting with jBPM API
}

export default jBPMClient;
