import axios from "axios";

// HTTP Requests
export default class WorkTimeService {

    getWorkTimesForDropdown() {
        return axios.get("http://localhost:8080/api/workTimes/getallfordropdown")
    }

}