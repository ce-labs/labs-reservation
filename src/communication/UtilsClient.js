import axios from "axios";
import { apiUrl } from "constants/communication";

export class UtilsClient {
  async getUserTypes() {
    const url = apiUrl + "/api/v1/utils/userTypes";
    const response = await axios(url);
    return response.data;
  }

  async getCurrentSemester() {
    const url = apiUrl + "/api/v1/utils/semester";
    const response = await axios(url);
    return response.data;
  }

  async getLabs() {
    const url = apiUrl + "/api/v1/utils/labs";
    const response = await axios(url);
    return response.data;
  }

  async getScheduleDays() {
    const url = apiUrl + "/api/v1/utils/scheduleDays";
    const response = await axios(url);
    return response.data;
  }

  async getScheduleSections() {
    const url = apiUrl + "/api/v1/utils/scheduleData";
    const response = await axios(url);
    return response.data;
  }

  async getStaff() {
    const url = apiUrl + "/api/v1/utils/staff";
    const response = await axios(url);
    return response.data;
  }

  async getCourses() {
    const url = apiUrl + "/api/v1/utils/courses";
    const response = await axios(url);
    return response.data;
  }
}
