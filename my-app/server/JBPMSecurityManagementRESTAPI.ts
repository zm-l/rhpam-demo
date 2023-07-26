import axios, { AxiosResponse } from "axios";

class JBPMSecurityManagementRESTAPI {
  private baseUrl: string;
  private authHeader: string;

  constructor() {
    this.baseUrl = "http://localhost/business-central/rest";
    this.authHeader = `Basic ${btoa("wbadmin:wbadmin")}`;
  }

  private getHeaders(): { headers: { [key: string]: string } } {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: this.authHeader,
      },
    };
  }

  async getUserGroups(userName: string): Promise<AxiosResponse> {
    return axios.get(
      `${this.baseUrl}/users/${userName}/groups`,
      this.getHeaders()
    );
  }

  async createUsers(userData: any): Promise<AxiosResponse> {
    return axios.post(`${this.baseUrl}/users`, userData, this.getHeaders());
  }

  async changeUserPassword(
    userName: string,
    newPassword: string
  ): Promise<AxiosResponse> {
    return axios.post(
      `${this.baseUrl}/users/${userName}/changePassword`,
      { password: newPassword },
      this.getHeaders()
    );
  }

  async overrideUserGroups(
    userName: string,
    groups: string[]
  ): Promise<AxiosResponse> {
    return axios.post(
      `${this.baseUrl}/users/${userName}/groups`,
      groups,
      this.getHeaders()
    );
  }

  async overrideUserRoles(
    userName: string,
    roles: string[]
  ): Promise<AxiosResponse> {
    return axios.post(
      `${this.baseUrl}/users/${userName}/roles`,
      roles,
      this.getHeaders()
    );
  }
}

export default JBPMSecurityManagementRESTAPI;
