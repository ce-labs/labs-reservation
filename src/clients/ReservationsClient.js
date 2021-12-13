import axios from "axios";

export class ReservationsClient {

    async getSemesterReservations(year, semester){
        const url = 'https://labs-reservation-api.herokuapp.com/api/v1/reservations/' + year + '/' + semester;
        const response =  await axios(url);
        return response.data;
    }

    async getWeekReservations(year, semester, week){
        const url = 'https://labs-reservation-api.herokuapp.com/api/v1/reservations/' + year + '/' + semester + '/' + week;
        const response =  await axios(url);
        return response.data;
    }

    async searchReservations(year, semester, category, filter) {
        const url = 'https://labs-reservation-api.herokuapp.com/api/v1/reservations/filter/{"year":"' + year + '","semester":"' + semester + '","category":"' + category + '","filter":"' + filter + '"}';
        const response =  await axios(url);
        return response.data;
    }

    async getCalendarReservations(year, semester, week, laboratory){
        const url = 'https://labs-reservation-api.herokuapp.com/api/v1/data/reservations/search/{"year":"' + year + '","semester":"' + semester + '","week":"' + week + '","laboratory":"' + laboratory + '"}';
        const response =  await axios(url);
        return response.data;
    }

    async createReservation(year, semester,week, laboratory, day, scheduleSection, description, manager, showDescription, creationAuthor, creationMail){
        const requestUrl = 'https://labs-reservation-api.herokuapp.com/api/v1/reservations/';
        const userData = {"year": year, "semester": semester, "week": week, "laboratory":laboratory, "day":day, "scheduleSection":scheduleSection, "description":description,"manager":manager, "showDescription":showDescription, "creationAuthor":creationAuthor, "creationMail":creationMail};
        const headers = { 'Content-Type': 'application/json' };
        const response = await axios.post(requestUrl, userData, headers)
          .catch((error) => {
            return(error.response);
          });
        return response.data;
    }

}