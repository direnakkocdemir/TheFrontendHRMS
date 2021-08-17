import React, { useState, useEffect } from "react";
import { Form, Segment, Header } from "semantic-ui-react";
import WorkTimeService from "../../services/workTimeService";
import CityService from "../../services/cityService";
import AdvertisementService from "../../services/advertisementService";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdvertiseForm() {

  //Redux state to use in the layout
  const { authItem } = useSelector((state) => state.auth);

  //States for form
  const [workTimes, setWorkTimes] = useState([]);
  const [cities, setCities] = useState([]);

  //States for sending the form inputs
  const [jobTitle, setJobTitle] = useState("");
  const [cityIndex, setCityIndex] = useState(0);
  const [workTimeIndex, setWorkTimeIndex] = useState(0);
  const [openPosition, setOpenPosition] = useState(0);
  const [description, setDescription] = useState("");

  //State for sending the advertisement information
  const [ad, setAd] = useState({
    employerId: authItem[0].user.id,
    description: description.value,
    jobTitle: jobTitle.value,
    locationId: cityIndex.value,
    openPosition: openPosition.value,
    workTimeId: workTimeIndex.value,
  });

  //Service to use the Http requests
  const workTimeService = new WorkTimeService();
  const cityService = new CityService();
  const advertisementService = new AdvertisementService();
  const history = useHistory(); // For using the router to change the component

  //Getting work times from backend
  async function getAllWorkTimes() {
    try {
      const response = await workTimeService.getWorkTimesForDropdown();
      setWorkTimes(response.data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }
  //Getting cities from backend
  async function getAllCitiesForDropdown() {
    try {
      const response = await cityService.getAllCitiesForDropdown();
      setCities(response.data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  //hook for taking action to getting the information 
  useEffect(() => {
    getAllWorkTimes();
    getAllCitiesForDropdown();
  }, []);

  //Function for posting the advertisement information to backend
  async function publishAd() {
    try {
      console.log(ad);
      const response = await advertisementService.postAdvertisement(
        ad,
        authItem[0].user.token
      );
      toast.success(response.data.message)
      history.push("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }

  }

  // Functions for changing the states 
  let changeHandler = (e) => setAd({ ...ad, [e.target.name]: e.target.value });
  let changeLocation = (e, { value }) =>
    setAd({ ...ad, locationId: value });
  let changeWorkTime = (e, { value }) =>
    setAd({ ...ad, workTimeId: value });

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Header as="h1" color="teal" textAlign="center">
        Advertise A Job
      </Header>
      <Segment>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Job  Title"
              name="jobTitle"
              placeholder="Job Title"
              onChange={changeHandler}
            />
            <Form.Select
              fluid
              label="City"
              name="location"
              options={cities}
              placeholder="City"
              onChange={changeLocation}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Open position"
              name="openPosition"
              placeholder="Open Position"
              onChange={changeHandler}
            />
            <Form.Select
              fluid
              label="Work Types"
              name="workTime"
              options={workTimes}
              placeholder="Work Types"
              onChange={changeWorkTime}
            />
          </Form.Group>
          <Form.TextArea
            label="Description"
            name="description"
            placeholder="Tell us more about job..."
            onChange={changeHandler}
          />
          <Form.Checkbox label="I agree to the Terms and Conditions" />
          <Form.Button onClick={publishAd}>Submit</Form.Button>
        </Form>
      </Segment>
    </div>
  );
}
