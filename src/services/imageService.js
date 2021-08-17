import axios from 'axios'

// HTTP Requests
export default class ImageService {

    getImageById(id, token) {
        return axios.get();
    }

    postImage(imageType, userId, image, token) {
        return axios.post(`http://localhost:8080/api/images/upload?imageType=${imageType}&jobseekerId=${userId}`, image, { headers: { 'Authorization': `Bearer ${token}` } });
    }
}