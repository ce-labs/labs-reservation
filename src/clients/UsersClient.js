import axios from "axios";

export class UsersClient {

    async getAllUsers(){
        const url = 'https://labs-reservation.herokuapp.com/api/v1/users/all';
        const response =  await axios(url);
        return response.data;
    }

    async getSingleUser(userId){        
        const url = 'https://labs-reservation.herokuapp.com/api/v1/users/' + userId;
        const response =  await axios(url);
        return response;
    }

    async getUserType(userId){        
        const url = 'https://labs-reservation.herokuapp.com/api/v1/users/userType/' + userId;
        const response =  await axios(url);
        return response.data;
    }

    async getUserMail(userId){        
      const url = 'https://labs-reservation.herokuapp.com/api/v1/users/' + userId;
      const response =  await axios(url);
      return response.data.mail;
    }

    async getUserStatus(userId){        
      const url = 'https://labs-reservation.herokuapp.com/api/v1/users/userStatus/' + userId;
      const response =  await axios(url);
      return response.data;
    }

    async getUserReservations(userId){        
      const url = 'https://labs-reservation.herokuapp.com/api/v1/users/reservations/' + userId;
      const response =  await axios(url);
      return response.data;
    }

    async searchUsers(category, filter) {
        const url = 'https://labs-reservation.herokuapp.com/api/v1/users/search/{"category":"' + category + '","filter":"' + filter + '"}';
        const response =  await axios(url);
        return response.data;
    }

    async createUser(userId, password, userType, firstName, lastName, mail, phone, creationAuthor){
        const requestUrl = 'https://labs-reservation.herokuapp.com/api/v1/users/';
        const userData = {"userId": userId, "password": password, "userType":userType, "firstName":firstName, "lastName":lastName, "mail":mail, "phone":phone, "creationAuthor":creationAuthor};
        const headers = { 'Content-Type': 'application/json' };
        const response = await axios.post(requestUrl, userData, headers)
          .catch((error) => {
            return(error.response);
          });
        return response.data;
    }

    async updatePersonalInformation(userId, mail, phone, password){
        const requestUrl = 'https://labs-reservation.herokuapp.com/api/v1/users/' + userId;
        const userData = {"mail": mail, "phone": phone, "password":password, "modificationAuthor":userId};
        const headers = { 'Content-Type': 'application/json' };
        const response = await axios.put(requestUrl, userData, headers)
          .catch((error) => {
            return(error.response);
          });
        return response.data;
    }

    async updateUserStatus(userId, userStatus){
        const requestUrl = 'https://labs-reservation.herokuapp.com/api/v1/users/status/' + userId;
        const userData = {"userStatus": userStatus};
        const headers = { 'Content-Type': 'application/json' };
        const response = await axios.put(requestUrl, userData, headers)
          .catch((error) => {
            return(error.response);
          });
        return response.data;
    }

    async removeUser(userId){
        const requestUrl = 'https://labs-reservation.herokuapp.com/api/v1/users/' + userId;
        const headers = { 'Content-Type': 'application/json' };
        const response = await axios.delete(requestUrl, headers)
          .catch((error) => {
            return(error.response);
          });
        return response.data;
    }
}