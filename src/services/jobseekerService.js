import axios from 'axios'

export default class JobseekerService{

    getJobseekerInfoById(id,token){
        return axios.get('http://localhost:8080/api/jobseekers/getDetails?id='+id, {headers: {'Authorization' : `Bearer ${token}`}});
    }

}