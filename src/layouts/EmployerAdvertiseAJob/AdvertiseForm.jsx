import React, { useState, useEffect } from "react";
import { Form, Segment, Header } from "semantic-ui-react";
import WorkTimeService from "../../services/workTimeService";
import CityService from "../../services/cityService";
import AdvertisementService from "../../services/advertisementService";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdvertiseForm() {
  const { authItem } = useSelector((state) => state.auth);

  const [workTimes, setWorkTimes] = useState([]);
  const [cities, setCities] = useState([]);

  const [jobTitle, setJobTitle] = useState("");
  const [cityIndex, setCityIndex] = useState(0);
  const [workTimeIndex, setWorkTimeIndex] = useState(0);
  const [openPosition, setOpenPosition] = useState(0);
  const [description, setDescription] = useState("");

  const [ad, setAd] = useState({
    employerId: authItem[0].user.id ,
    description: description.value,
    jobTitle: jobTitle.value,
    locationId:  cityIndex.value ,
    openPosition: openPosition.value,
    workTimeId:  workTimeIndex.value ,
  });
  const workTimeService = new WorkTimeService();
  const cityService = new CityService();
  const advertisementService = new AdvertisementService();
  const history = useHistory();

  async function getAllWorkTimes() {
    try {
      const response = await workTimeService.getWorkTimesForDropdown();
      setWorkTimes(response.data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  async function getAllCitiesForDropdown() {
    try {
      const response = await cityService.getAllCitiesForDropdown();
      setCities(response.data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  useEffect(() => {
    getAllWorkTimes();
    getAllCitiesForDropdown();
  }, []);

  async function publishAd() {
    try{
      const response = await advertisementService.postAdvertisement(
      ad,
      authItem[0].user.token
    );
    toast.success(response.data.message)
    history.push("/");
    }catch(err){
      toast.error(err.response.data.message);
    }
    
  }

  let changeHandler = (e) => setAd({ ...ad, [e.target.name]: e.target.value });
  let changeLocation = (e, { value }) =>
    setAd({ ...ad, locationId:value });
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
