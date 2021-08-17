import axios from 'axios'

// HTTP Requests
export default class UserService {

   registerEmployer(employerRegister) {
      return axios.post('http://localhost:8080/api/auth/employer', employerRegister);
   }

   registerJobseeker(jobseekerRegister) {
      return axios.post('http://localhost:8080/api/auth/jobseeker', jobseekerRegister);
   }

   login(values) {
      return axios.post('http://localhost:8080/api/auth/login', values)
   }

}
