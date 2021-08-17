import React, { useState, useEffect } from "react";
import {
  Dropdown,
  Segment,
  Divider,
  Label,
  Menu,
  Button,
  Input,
} from "semantic-ui-react";
import WorkTimeService from "../services/workTimeService";
import CityService from "../services/cityService";
import { useHistory } from "react-router-dom";

export default function Filter(props) {

  // State to keep the filters 
  const [filter, setFilter] = useState({
    jobTitle: "",
    location: 0,
    workTime: 0,
  });
  // State to keep the cities for dropdown
  const [cities, setCities] = useState([]);
  // State to keep the cities for dropdown 
  const [workTimes, setWorkTimes] = useState([]);
  //Service to use the Http requests 
  const workTimeService = new WorkTimeService();
  const cityService = new CityService();
  const history = useHistory(); // For using the router to change the component

  // Component path name and state
  const location = {
    pathname: "/ads",
    state: {
      workTime: filter.workTime,
      jobTitle: filter.jobTitle,
      location: filter.location,
    }
  };
  // Function to get the work times from the data base
  async function getAllWorkTimes() {
    try {
      const response = await workTimeService.getWorkTimesForDropdown();
      setWorkTimes(response.data);
    } catch (err) { }
  }

  // Function to get the cities from the data base
  async function getAllCities() {
    try {
      const response = await cityService.getAllCitiesForDropdown();
      setCities(response.data);
    } catch (error) {

    }
  }

  // hook for taking action to get cities and work time
  // if props change, hook works again
  useEffect(() => {
    getAllWorkTimes();
    getAllCities();
  }, [props]);

  // Function to change the component with state
  function filterAds() {
    history.push(location);
  }
  // Functions to handle changes 
  let changeHandler = (e) =>
    setFilter({ ...filter, [e.target.name]: e.target.value });
  let changeLocation = (e, { value }) =>
    setFilter({ ...filter, location: value });
  let changeWorkTime = (e, { value }) =>
    setFilter({ ...filter, workTime: value });

  return (
    <div>
      <Segment>
        <Label>Job Title</Label>
        <br />
        <br />
        <Input
          name="jobTitle"
          placeholder="Job Title"
          fluid
          onChange={changeHandler}
        />
        <Divider />
        <Label>City</Label>
        <Menu>
          <Dropdown
            clearable
            name="location"
            options={cities}
            selection
            placeholder="City"
            fluid
            onChange={changeLocation}
          />
        </Menu>

        <Divider />
        <Label>Job Type</Label>
        <Menu>
          <Dropdown
            clearable
            name="workTime"
            options={workTimes}
            selection
            placeholder="Work Times"
            fluid
            onChange={changeWorkTime}
          />
        </Menu>
        <Button onClick={filterAds} fluid>
          Filter
        </Button>
      </Segment>
    </div>
  );
}
