import axios from 'axios'

// HTTP Requests
export default class SkillService {

    getSkill(id, token) {
        return axios.get("http://localhost:8080/api/skills/get?id=" + id, { headers: { 'Authorization': `Bearer ${token}` } });
    }

    postSkill(skill, token) {
        return axios.post('http://localhost:8080/api/skills/add', skill, { headers: { 'Authorization': `Bearer ${token}` } });
    }

    deleteSkill(skillId, token) {
        return axios.post('http://localhost:8080/api/skills/delete', skillId, { headers: { 'Authorization': `Bearer ${token}` } });
    }
}