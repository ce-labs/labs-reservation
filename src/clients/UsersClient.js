import axios from "axios";

export class UsersClient {
    async getSingleUser(userId){        
        const url = 'https://labs-reservation-api.herokuapp.com/api/v1/users/' + userId;
        const response =  await axios(url);
        return response;
    }

}