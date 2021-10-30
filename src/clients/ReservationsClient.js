import axios from "axios";

export class ReservationsClient {

    async getSemesterReservations(year, semester){
        const url = 'https://labs-reservation-api.herokuapp.com/api/v1/reservations/' + year + '/' + semester;
        const response =  await axios(url);
        return response.data;
    }

    async searchReservations(year, semester, category, filter) {
        const url = 'https://labs-reservation-api.herokuapp.com/api/v1/data/reservations/search/{"year":"' + year + '","semester":"' + semester + '","category":"' + category + '","filter":"' + filter + '"}';
        const response =  await axios(url);
        return response.data;
    }


}