import axios from "axios";

export class BlockadesClient {

    async getSemesterBlockades(year, semester){
        const url = 'https://labs-reservation-api.herokuapp.com/api/v1/blockades/' + year + '/' + semester;
        const response =  await axios(url);
        return response.data;
    }

    async searchBlockades(year, semester, category, filter) {
        const url = 'https://labs-reservation-api.herokuapp.com/api/v1/data/blockades/search/{"year":"' + year + '","semester":"' + semester + '","category":"' + category + '","filter":"' + filter + '"}';
        const response =  await axios(url);
        return response.data;
    }


}