import axios from 'axios'

export default class ExperienceService{

    getExperience(id,token){
        return axios.get("http://localhost:8080/api/experiences/get?id="+id, {headers: {'Authorization' : `Bearer ${token}`}});
    }

    postExperience(experience,token){
        return axios.post('http://localhost:8080/api/experiences/add',experience, {headers: {'Authorization' : `Bearer ${token}`}});
    }
}