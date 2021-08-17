import axios from 'axios'

// HTTP Requests
export default class ResumeService {

    getResumeByJobseekerId(id, token) {
        return axios.get('http://localhost:8080/api/resumes/get?id=' + id, { headers: { 'Authorization': `Bearer ${token}` } });
    }

    getResumeIdByJobseekerId(id, token) {
        return axios.get('http://localhost:8080/api/resumes/getid?id=' + id, { headers: { 'Authorization': `Bearer ${token}` } })
    }

}