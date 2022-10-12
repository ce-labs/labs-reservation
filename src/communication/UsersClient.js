import axios from "axios";
import { apiUrl } from "constants/communication";

export class UsersClient {
  async getSingleUser(userId) {
    const url = apiUrl + "/api/v1/users/" + userId;
    const response = await axios(url);
    return response;
  }

  async getAllUsers() {
    const url = apiUrl + "/api/v1/users/all";
    const response = await axios(url);
    return response.data;
  }

  async searchUsers(category, filter) {
    const url =
      apiUrl +
      '/api/v1/users/search/{"category":"' +
      category +
      '","filter":"' +
      filter +
      '"}';
    const response = await axios(url);
    return response.data;
  }

  async updatePersonalInformation(userId, mail, phone, password) {
    const requestUrl = apiUrl + "/api/v1/users/" + userId;
    const userData = {
      mail: mail,
      phone: phone,
      password: password,
      modificationAuthor: userId,
    };
    const headers = { "Content-Type": "application/json" };
    const response = await axios
      .put(requestUrl, userData, headers)
      .catch((error) => {
        return error.response;
      });
    return response.data;
  }
}
