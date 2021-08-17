import axios from "axios";

// HTTP Requests
export default class AboutService {

  postAbout(about, token) {
    return axios.post("http://localhost:8080/api/abouts/add", about, { headers: { 'Authorization': `Bearer ${token}` } });
  }

  getAboutByResumeId(id, token) {
    return axios.get("http://localhost:8080/api/abouts/getbyresumeid?id=" + id, { headers: { 'Authorization': `Bearer ${token}` } });
  }

  getEmployerAboutByEmployerId(id, token) {
    return axios.get("http://localhost:8080/api/employerAbouts/get?id=" + id, { headers: { 'Authorization': `Bearer ${token}` } });
  }

  postEmployerAbout(about, token) {
    return axios.post("http://localhost:8080/api/employerAbouts/add", about, { headers: { 'Authorization': `Bearer ${token}` } });
  }

  deleteAbout(aboutId, token) {
    return axios.post("http://localhost:8080/api/abouts/delete", aboutId, { headers: { 'Authorization': `Bearer ${token}` } });
  }

  deleteEmployerAbout(aboutId, token) {
    return axios.post("http://localhost:8080/api/employerAbouts/delete", aboutId, { headers: { 'Authorization': `Bearer ${token}` } });
  }

}
