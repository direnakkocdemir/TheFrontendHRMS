import axios from "axios";

// HTTP Requests
export default class AdvertisementService {
  getAllPages(pageNo, pageSize) {
    return axios.get(
      "http://localhost:8080/api/advertisements/getallpages?pageNo=" +
      pageNo +
      "&pageSize=" +
      pageSize
    );
  }

  // getAllByJobTitle(jobTitle) {
  //   return axios.get(
  //     "http://localhost:8080/api/advertisements/getallbyjobtitle?jobtitle=" + jobTitle
  //   );
  // }

  // getAllByLocation(location) {
  //   return axios.get(
  //     "http://localhost:8080/api/advertisements/getallbylocation?location=" + location
  //   );
  // }

  // getAllByJobTitleAndLocation(jobTitle, location) {
  //   return axios.get(
  //     "http://localhost:8080/api/advertisements/getallbyjobtitleandlocation?jobtitle=" +
  //       jobTitle +
  //       "&location=" +
  //       location
  //   );
  // }

  getAdsByEmployerId(id) {
    return axios.get(
      "http://localhost:8080/api/advertisements/getByEmployerId?id=" + id
    );
  }

  postAdvertisement(ad, token) {
    return axios.post("http://localhost:8080/api/advertisements/add", ad, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getAdvertisementByEmployerName(name, pageNo, pageSize, token) {
    return axios.get(
      "http://localhost:8080/api/advertisements/getByEmployerName?name=" +
      name +
      "&pageNo=" +
      pageNo +
      "&pageSize=" +
      pageSize,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  getAdvertisementByJobTitle(jobTitle, pageNo, pageSize) {
    return axios.get(
      "http://localhost:8080/api/advertisements/getallbyjobtitle?jobTitle=" +
      jobTitle +
      "&pageNo=" +
      pageNo +
      "&pageSize=" +
      pageSize
    );
  }

  getAdvertisementByLocation(locationId, pageNo, pageSize) {
    return axios.get(
      "http://localhost:8080/api/advertisements/getallbylocation?location=" +
      locationId +
      "&pageNo=" +
      pageNo +
      "&pageSize=" +
      pageSize
    );
  }

  getAdvertisementByJobTitleAndLocation(jobTitle, locationId, pageNo, pageSize) {
    return axios.get(
      "http://localhost:8080/api/advertisements/getallbyjobtitleandlocation?jobTitle=" +
      jobTitle +
      "&location=" +
      locationId +
      "&pageNo=" +
      pageNo +
      "&pageSize=" +
      pageSize
    );
  }

  getAdvertisementByJobTitleAndLocationAndWorkTime(
    jobTitle,
    locationId,
    workTimeId,
    pageNo,
    pageSize
  ) {
    return axios.get(
      "http://localhost:8080/api/advertisements/getbyall?jobTitle=" +
      jobTitle +
      "&location=" +
      locationId +
      "&pageNo=" +
      pageNo +
      "&pageSize=" +
      pageSize +
      "&workTime=" +
      workTimeId
    );
  }

  getAdvertisementByLocationAndWorkTime(
    locationId,
    workTimeId,
    pageNo,
    pageSize
  ) {
    return axios.get(
      "http://localhost:8080/api/advertisements/getallbylocationandworktime?location=" +
      locationId +
      "&workTime=" +
      workTimeId +
      "&pageNo=" +
      pageNo +
      "&pageSize=" +
      pageSize
    );
  }

  getAdvertisementByJobTitleAndWorkTime(
    jobTitle,
    workTimeId,
    pageNo,
    pageSize
  ) {
    return axios.get(
      "http://localhost:8080/api/advertisements/getallbyjobtitleworktime?jobTitle=" +
      jobTitle +
      "&workTime=" +
      workTimeId +
      "&pageNo=" +
      pageNo +
      "&pageSize=" +
      pageSize
    );
  }
  getAdvertisementByWorkTime(workTimeId, pageNo, pageSize) {
    return axios.get(
      "http://localhost:8080/api/advertisements/getallbyworktime?worktime=" +
      workTimeId +
      "&pageNo=" +
      pageNo +
      "&pageSize=" +
      pageSize
    );
  }

  getAdvertisementById(adId, token) {
    return axios.get(
      "http://localhost:8080/api/advertisements/get?id=" + adId,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  closeAdvertisement(advertisementId, token) {
    return axios.post(
      "http://localhost:8080/api/advertisements/close", advertisementId,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
}
