import axios from "axios";
import { apiUrl } from "../assets/constants";

export class LoginClient {
  async verifyUser(userId, password) {
    const requestUrl = apiUrl + "/api/v1/auth/login";
    const userData = { userId: userId, password: password };
    const headers = { "Content-Type": "application/json" };
    const response = await axios
      .post(requestUrl, userData, headers)
      .catch((error) => {
        return error.response;
      });
    return response.data;
  }

  async getRecoveryCode(userId, mail) {
    const requestUrl = apiUrl + "/api/v1/auth/recover/code";
    const userData = { userId: userId, mail: mail };
    const headers = { "Content-Type": "application/json" };
    const response = await axios
      .post(requestUrl, userData, headers)
      .catch((error) => {
        return error.response;
      });
    return response.data;
  }

  async verifyRecoveryCode(userId, recoveryCode) {
    const requestUrl = apiUrl + "/api/v1/auth/recover/verify";
    const userData = { userId: userId, recoveryCode: recoveryCode };
    const headers = { "Content-Type": "application/json" };
    const response = await axios
      .post(requestUrl, userData, headers)
      .catch((error) => {
        return error.response;
      });
    return response.data;
  }

  async updatePassword(userId, password) {
    const requestUrl = apiUrl + "/api/v1/auth/recover/update";
    const userData = { userId: userId, password: password };
    const headers = { "Content-Type": "application/json" };
    const response = await axios
      .post(requestUrl, userData, headers)
      .catch((error) => {
        return error.response;
      });
    return response.data;
  }
}
