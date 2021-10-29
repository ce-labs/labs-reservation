import axios from "axios";

export class ReservationsClient {

    async getSemesterReservations(year, semester){
        const url = 'https://labs-reservation-api.herokuapp.com/api/v1/reservations/' + year + '/' + semester;
        const response =  await axios(url);
        return response.data;
    }


}