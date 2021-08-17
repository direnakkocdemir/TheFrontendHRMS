import axios from 'axios'

// HTTP Requests
export default class LanguageService {

    getLanguage(id, token) {
        return axios.get("http://localhost:8080/api/languages/get?id=" + id, { headers: { 'Authorization': `Bearer ${token}` } });
    }

    postLanguage(language, token) {
        return axios.post('http://localhost:8080/api/languages/add', language, { headers: { 'Authorization': `Bearer ${token}` } });
    }

    deleteLanguage(languageId, token) {
        return axios.post('http://localhost:8080/api/languages/delete', languageId, { headers: { 'Authorization': `Bearer ${token}` } });
    }
}