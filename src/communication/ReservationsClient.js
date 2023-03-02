import axios from "axios";
import { apiUrl } from "constants/communication";

export class ReservationsClient {
  async getSemesterReservations(year, semester) {
    const url = apiUrl + "/api/v1/reservations/" + year + "/" + semester;
    const response = await axios(url);
    return response.data;
  }

  async getSemesterBlockades(year, semester) {
    const url = apiUrl + "/api/v1/blockades/" + year + "/" + semester;
    const response = await axios(url);
    return response.data;
  }

  async getCalendarReservations(year, semester, week, laboratory) {
    const url =
      apiUrl +
      '/api/v1/data/reservations/search/{"year":"' +
      year +
      '","semester":"' +
      semester +
      '","week":"' +
      week +
      '","laboratory":"' +
      laboratory +
      '"}';
    const response = await axios(url);
    return response.data;
  }

  async getCalendarBlockades(year, semester, laboratory) {
    const url =
      apiUrl +
      '/api/v1/blockades/' +
      year + '/'+
      semester + '/'+
      laboratory;
      //console.log("🚀 ~ file: ReservationsClient.js:43 ~ ReservationsClient ~ getCalendarBlockades ~ apiUrl:", url)

    const response = await axios(url);
    return response.data;
  }

  async createBlockade(
    year,
    semester,
    laboratory,
    day,
    scheduleSection,
    description,
    manager,
    showDescription,
    creationAuthor,
    creationMail
  ) {
    const requestUrl = apiUrl + "/api/v1/blockades/";
    const userData = {
      year: year,
      semester: semester,
      laboratory: laboratory,
      day: day,
      scheduleSection: scheduleSection,
      description: description,
      manager: manager,
      showDescription: showDescription,
      creationAuthor: creationAuthor,
      creationAuthorMail: creationMail,
    };
    const headers = { "Content-Type": "application/json" };
    const response = await axios
      .post(requestUrl, userData, headers)
      .catch((error) => {
        return error.response;
      });
    return response.data;
  }

  async createReservation(
    year,
    semester,
    week,
    laboratory,
    day,
    scheduleSection,
    description,
    manager,
    showDescription,
    creationAuthor,
    creationMail
  ) {
    const requestUrl = apiUrl + "/api/v1/reservations/";
    const userData = {
      year: year,
      semester: semester,
      week: week,
      laboratory: laboratory,
      day: day,
      scheduleSection: scheduleSection,
      description: description,
      manager: manager,
      showDescription: showDescription,
      creationAuthor: creationAuthor,
      creationAuthorMail: creationMail,
    };
    const headers = { "Content-Type": "application/json" };
    const response = await axios
      .post(requestUrl, userData, headers)
      .catch((error) => {
        return error.response;
      });
    return response.data;
  }
}
