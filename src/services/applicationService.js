import axios from "axios";

export default class ApplicationService {
  
  apply(advertisementId, jobseekerId, token) {
    return axios.post(
      "http://localhost:8080/api/advertisements/apply",{"advertisementId":advertisementId,"jobseekerId":jobseekerId},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  getApplicationByAdvertisementId(id, token) {
    return axios.get(
      "http://localhost:8080/api/applications/getbyadid?id=" + id,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  getApplicationByJobseekerId(id, token) {
    return axios.get(
      "http://localhost:8080/api/applications/getbyjobseekerid?id=" + id,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
}
