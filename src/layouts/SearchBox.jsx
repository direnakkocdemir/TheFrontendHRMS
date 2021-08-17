import React, { useState, useEffect } from "react";
import { Grid, Input, Segment, Button, Label, Dropdown } from "semantic-ui-react";
import { useHistory } from "react-router";
import CityService from '../services/cityService';

export default function SearchBox() {

  // States for keep the search informations 
  const [jobTitle, setJobTitle] = useState("");
  const [cities, setCities] = useState([]);
  const [locations, setLocations] = useState(0);

  // Component path name and states
  const location = {
    pathname: "/ads",
    state: { jobTitle: jobTitle.value, location: locations.value },
  };

  const history = new useHistory(); // For using the router to change the component

  // Function to search by filter
  async function search() {
    history.push(location);
  }
  //Service to use the Http requests 
  let cityService = new CityService();
  // Function to get the cities from the data base
  async function getCities() {
    const response = await cityService.getAllCitiesForDropdown();
    setCities(response.data);
  }

  // hook for taking action to get cities
  // if filter(location) changes, hook works again
  useEffect(() => {
    getCities();
  }, [location])

  // Functions to handle changes 
  let handleJobTitle = (e, { value }) => setJobTitle({ value });
  let handleLocation = (e, { value }) => setLocations({ value });

  return (
    <div style={{ height: "85vh", width: "100%", display: "flex", justifyContent: "center", flexDirection: "column" }} >
      <Label size="massive"  >
        Are you looking for a job? </Label>
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={7} textAlign="center" verticalAlign="middle">
              <Input
                transparent
                size="massive"
                placeholder="Job Title..."
                name="jobTitle"
                onChange={handleJobTitle}
              />
            </Grid.Column>
            <Grid.Column width={7} textAlign="center" verticalAlign="middle">
              <Dropdown
                clearable
                size="massive"
                name="location"
                options={cities}
                selection
                placeholder="City"
                fluid
                onChange={handleLocation}
              />
              {/* <Input
                transparent
                size="massive"
                placeholder="Location..."
                name="locations"
                onChange={handleLocation}
              /> */}
            </Grid.Column>
            <Grid.Column width={2} textAlign="center" verticalAlign="middle">
              <Button
                inverted
                color="purple"
                size="huge"
                icon="search"
                onClick={search}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
}
