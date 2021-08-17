import axios from 'axios'

// HTTP Requests
export default class CityService {

    getAllCitiesForDropdown() {
        return axios.get("http://localhost:8080/api/location/getallfordropdown");
    }

}