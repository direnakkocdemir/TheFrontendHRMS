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
  const [filter, setFilter] = useState({
    jobTitle: "",
    location: 0,
    workTime: 0,
  });
  const [cities, setCities] = useState([]);
  const [workTimes, setWorkTimes] = useState([]);

  const workTimeService = new WorkTimeService();
  const cityService = new CityService();
  const history = useHistory();
  const location = {
    pathname: "/ads",
    state: {
      workTime: filter.workTime,
      jobTitle: filter.jobTitle,
      location: filter.location,
    }
  };

  async function getAllWorkTimes() {
    const response = await workTimeService.getWorkTimesForDropdown();
    setWorkTimes(response.data);
  }

  async function getAllCities() {
    const response = await cityService.getAllCitiesForDropdown();
    setCities(response.data);
  }

  useEffect(() => {
    getAllWorkTimes();
    getAllCities();
  }, [props]);

  function filterAds() {
    history.push(location);
  }
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
