import axios from "axios";

export class BlockadesClient {

    async getSemesterBlockades(year, semester){
        const url = 'https://labs-reservation.herokuapp.com/api/v1/blockades/' + year + '/' + semester;
        const response =  await axios(url);
        return response.data;
    }

    async searchBlockades(year, semester, category, filter) {
        const url = 'https://labs-reservation.herokuapp.com/api/v1/data/blockades/search/{"year":"' + year + '","semester":"' + semester + '","category":"' + category + '","filter":"' + filter + '"}';
        const response =  await axios(url);
        return response.data;
    }

    async createBlockade(year, semester, laboratory, day, scheduleSection, description, manager, showDescription, creationAuthor, creationMail){
        const requestUrl = 'https://labs-reservation.herokuapp.com/api/v1/blockades/';
        const userData = {"year": year, "semester": semester, "laboratory":laboratory, "day":day, "scheduleSection":scheduleSection, "description":description,"manager":manager, "showDescription":showDescription, "creationAuthor":creationAuthor, "creationAuthorMail":creationMail};
        const headers = { 'Content-Type': 'application/json' };
        const response = await axios.post(requestUrl, userData, headers)
          .catch((error) => {
            return(error.response);
          });
        return response.data;
    }


}