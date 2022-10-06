import axios from "axios";
import { apiUrl } from "constants/communication";

export class UsersClient {
  async getSingleUser(userId) {
    const url = apiUrl + "/api/v1/users/" + userId;
    const response = await axios(url);
    return response;
  }

 
}
