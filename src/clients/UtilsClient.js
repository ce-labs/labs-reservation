import axios from "axios";

export class UtilsClient {

    async getUserTypes(){
        const url = 'https://labs-reservation-api.herokuapp.com/api/v1/utils/userTypes';
        const response =  await axios(url);
        return response.data;
    }

    async getCurrentSemester(){
        const url = 'https://labs-reservation-api.herokuapp.com/api/v1/utils/semester';
        const response =  await axios(url);
        return response.data;
    }

    async getLabs(){
        const url = 'https://labs-reservation-api.herokuapp.com/api/v1/utils/labs';
        const response =  await axios(url);
        return response.data;
    }

}