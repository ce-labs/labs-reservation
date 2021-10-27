import axios from "axios";

export class UsersClient {
    async getSingleUser(userId){        
        const url = 'https://labs-reservation-api.herokuapp.com/api/v1/users/' + userId;
        const response =  await axios(url);
        return response;
    }

    async updatePersonalInformation(userId, mail, phone, password){
        const requestUrl = 'https://labs-reservation-api.herokuapp.com/api/v1/users/' + userId;
        const userData = {"mail": mail, "phone": phone, "password":password, "modificationAuthor":userId};
        const headers = { 'Content-Type': 'application/json' };
        const response = await axios.put(requestUrl, userData, headers)
          .catch((error) => {
            return(error.response);
          });
        return response.data;
    }
}