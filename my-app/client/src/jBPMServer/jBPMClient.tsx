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

  public getUsername(): string {
    return this.username;
  }

  public resetCredentials() {
    this.username = "wbadmin";
    this.password = "wbadmin";
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
    const url = `${this.baseUrl}/containers/${containerId}/processes/${processId}/instances`;
    console.log(this.username, this.password);
    console.log(axios.get(this.baseUrl, { headers }));
    return axios.post(url, inputData, { headers });
  }

  public completeHumanTask(
    containerId: string,
    taskId: string,
    inputData: any
  ): Promise<AxiosResponse> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/containers/${containerId}/tasks/${taskId}/states/completed`;
    return axios.put(url, inputData, { headers });
  }

  public getTaskList(): Promise<AxiosResponse> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/queries/tasks/instances/pot-owners`;
    return axios.get(url, { headers });
  }

  public getTaskInstance(taskInstanceId: Number): Promise<AxiosResponse> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/containers/${containerId}/tasks/${taskInstanceId}?withInputData=true&withOutputData=true&withAssignments=true`;
    return axios.get(url, { headers });
  }

  public claimTaskInstance(taskInstanceId: Number): Promise<AxiosResponse> {
    console.log(this.username, this.password);
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/containers/${containerId}/tasks/${taskInstanceId}/states/claimed`;
    return axios.put(url, null, { headers });
  }

  public getProcessInstance = async (
    processInstanceId: Number
  ): Promise<AxiosResponse> => {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/containers/${containerId}/processes/instances/${processInstanceId}`;
    return axios.get(url, { headers });
  };

  public getProcessNodeInstance = async (
    processInstanceId: Number
  ): Promise<AxiosResponse> => {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/containers/${containerId}/processes/instances/${processInstanceId}/nodes/instances`;
    return axios.get(url, { headers });
  };
  // Add more methods for interacting with jBPM API
}

export default jBPMClient;
