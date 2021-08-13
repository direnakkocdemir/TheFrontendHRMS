import axios from 'axios'

export default class ImageService{

    getImageById(id,token){
        return axios.get();
    }

    postImage(imageType,userId,image,token){
        return axios.post('http://localhost:8080/api/images/upload?imageType='+imageType+'&user.id='+userId,image, {headers: {'Authorization' : `Bearer ${token}`}});
    }
}