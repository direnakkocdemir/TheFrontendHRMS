import axios from 'axios'

export default class EducationService{

    getEducation(id,token){
        return axios.get("http://localhost:8080/api/educations/get?id="+id, {headers: {'Authorization' : `Bearer ${token}`}});
    }

    postEducation(education,token){
        return axios.post('http://localhost:8080/api/educations/add',education, {headers: {'Authorization' : `Bearer ${token}`}});
    }
}