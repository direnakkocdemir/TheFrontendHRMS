import axios from 'axios'

// HTTP Requests
export default class EmployerService {

    getEmployerById(id, token) {
        return axios.get('http://localhost:8080/api/employers/get?id=' + id, { headers: { 'Authorization': `Bearer ${token}` } });
    }

    getEmployerInfoById(id, token) {
        return axios.get('http://localhost:8080/api/employers/get?id=' + id, { headers: { 'Authorization': `Bearer ${token}` } });
    }

}