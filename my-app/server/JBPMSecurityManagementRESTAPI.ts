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

  public getRoles(): Promise<AxiosResponse> {
    return axios.get(`${this.baseUrl}/roles`, this.getHeaders());
  }

  async getUsers(): Promise<AxiosResponse> {
    console.log(this.authHeader);
    return axios.get(`${this.baseUrl}/users`, this.getHeaders());
  }

  async getGroups(): Promise<AxiosResponse> {
    return axios.get(`${this.baseUrl}/groups`);
  }

  async getUserGroups(userName: string): Promise<AxiosResponse> {
    return axios.get(
      `${this.baseUrl}/users/${userName}/groups`,
      this.getHeaders()
    );
  }

  async getUserRoles(userName: string): Promise<AxiosResponse> {
    return axios.get(`${this.baseUrl}/users/${userName}/roles`);
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

  async createGroups(groupData: any): Promise<AxiosResponse> {
    return axios.post(`${this.baseUrl}/groups`, groupData);
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

  async updateGroupPermissions(
    groupName: string,
    permissions: any
  ): Promise<AxiosResponse> {
    return axios.post(
      `${this.baseUrl}/groups/${groupName}/permissions`,
      permissions
    );
  }

  async updateRolePermissions(
    roleName: string,
    permissions: any
  ): Promise<AxiosResponse> {
    return axios.post(
      `${this.baseUrl}/roles/${roleName}/permissions`,
      permissions
    );
  }

  async getGroupPermissions(groupName: string): Promise<AxiosResponse> {
    return axios.get(`${this.baseUrl}/groups/${groupName}/permissions`);
  }

  async getRolePermissions(roleName: string): Promise<AxiosResponse> {
    return axios.get(`${this.baseUrl}/roles/${roleName}/permissions`);
  }

  async getUserPermissions(userName: string): Promise<AxiosResponse> {
    return axios.get(`${this.baseUrl}/users/${userName}/permissions`);
  }

  async deleteUser(userName: string): Promise<AxiosResponse> {
    return axios.delete(`${this.baseUrl}/users/${userName}`);
  }

  async deleteGroup(groupName: string): Promise<AxiosResponse> {
    return axios.delete(`${this.baseUrl}/groups/${groupName}`);
  }
}

export default JBPMSecurityManagementRESTAPI;
