import axios from "axios";

export class UsersClient {

    async getAllUsers(){
        const url = 'https://labs-reservation-api.herokuapp.com/api/v1/users/all';
        const response =  await axios(url);
        return response.data;
    }

    async getSingleUser(userId){        
        const url = 'https://labs-reservation-api.herokuapp.com/api/v1/users/' + userId;
        const response =  await axios(url);
        return response;
    }

    async getUserType(userId){        
        const url = 'https://labs-reservation-api.herokuapp.com/api/v1/users/userType/' + userId;
        const response =  await axios(url);
        return response.data;
    }

    async searchUsers(category, filter) {
        const url = 'https://labs-reservation-api.herokuapp.com/api/v1/users/search/{"category":"' + category + '","filter":"' + filter + '"}';
        const response =  await axios(url);
        return response.data;
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


    async removeUser(userId){
        const requestUrl = 'https://labs-reservation-api.herokuapp.com/api/v1/users/' + userId;
        const headers = { 'Content-Type': 'application/json' };
        const response = await axios.delete(requestUrl, headers)
          .catch((error) => {
            return(error.response);
          });
        return response.data;
    }
}