import React, { useState, useEffect } from "react";
import AdvertisementService from "../services/advertisementService";
import {
  Card,
  Icon,
  Pagination,
  Dropdown,
  Table,
  Button,
} from "semantic-ui-react";
import { useHistory } from "react-router";
import ApplicationService from "../services/applicationService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AdsList(props) {

  //Props to use in this component from parent
  const jobTitle = props.location.state.jobTitle;
  const location = props.location.state.location;
  const workTime = props.location.state.workTime;

  //Redux states to use in the component
  const { authItem } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);

  // State for keeping the advertisements for this component
  const [ads, setAds] = useState([]);
  // States to keep the page informations
  let [activePage, setActivePage] = useState(1);
  let [pageSize, setPageSize] = useState(2);
  let [totalPageSize, setTotalPageSize] = useState(0);

  //Service to use the Http requests 
  let advertisementService = new AdvertisementService();
  let applicationService = new ApplicationService();

  const history = useHistory(); // For using the router to change the component

  // Function to get all advertisements without filter
  async function getAll() {
    try {
      const response = await advertisementService.getAllPages(
        activePage,
        pageSize
      );
      setAds(response.data.data);
    } catch (err) {
      toast.error(err.response.data.message)
    }

  }

  // Function to get filtered advertisements by job title
  async function getAllByJobTitle(jobTitle) {
    try {
      const response = await advertisementService.getAdvertisementByJobTitle(
        jobTitle,
        activePage,
        pageSize
      );
      setAds(response.data.data);
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }
  // Function to get filtered advertisements by location
  async function getAllByLocation(location) {
    try {
      const response = await advertisementService.getAdvertisementByLocation(
        location,
        activePage,
        pageSize
      );
      setAds(response.data.data);
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }
  // Function to get filtered advertisements by work time
  async function getAllByWorkTime(workTime) {
    try {
      const response = await advertisementService.getAdvertisementByWorkTime(
        workTime,
        activePage,
        pageSize
      );
      setAds(response.data.data);
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }
  // Function to get filtered advertisements by job title and location
  async function getAllByJobTitleAndLocation(jobTitle, location) {
    try {
      const response =
        await advertisementService.getAdvertisementByJobTitleAndLocation(
          jobTitle,
          location,
          activePage,
          pageSize
        );
      setAds(response.data.data);
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }
  // Function to get filtered advertisements by job title and work time
  async function getAllByJobTitleAndWorkTime(jobTitle, workTime) {
    try {
      const response =
        await advertisementService.getAdvertisementByJobTitleAndWorkTime(
          jobTitle,
          workTime,
          activePage,
          pageSize
        );
      setAds(response.data.data);
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }
  // Function to get filtered advertisements by location and work time 
  async function getAllByLocationAndWorkTime(location, workTime) {
    try {
      const response =
        await advertisementService.getAdvertisementByLocationAndWorkTime(
          location,
          workTime,
          activePage,
          pageSize
        );
      setAds(response.data.data);
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }
  // Function to get filtered advertisements by all filters
  async function getAllByAll(jobTitle, location, workTime) {
    try {
      const response =
        await advertisementService.getAdvertisementByJobTitleAndLocationAndWorkTime(
          jobTitle,
          location,
          workTime,
          activePage,
          pageSize
        );
      setAds(response.data.data);
    } catch (err) {
      toast.error(err.response.data.message)
    }

  }

  //hook for taking action by filter
  // if props,authItem, pageSize, activePage change, hook works again
  useEffect(() => {
    if (jobTitle && location && workTime) {
      getAllByAll(jobTitle, location, workTime);
    } else if (!jobTitle && location && workTime) {
      getAllByLocationAndWorkTime(location, workTime);
    } else if (jobTitle && !location && workTime) {
      getAllByJobTitleAndWorkTime(jobTitle, workTime);
    } else if (jobTitle && location && !workTime) {
      getAllByJobTitleAndLocation(jobTitle, location);
    } else if (!jobTitle && !location && workTime > 0) {
      getAllByWorkTime(workTime);
    } else if (!jobTitle && location && !workTime) {
      getAllByLocation(location);
    } else if (jobTitle && !location && !workTime) {
      getAllByJobTitle(jobTitle);
    } else {
      getAll();
    }
    setTotalPageSize(5);
  }, [authItem, pageSize, activePage, props]);

  //Function for applying the job by advertisement id 
  async function apply(advertisementId) {
    try {
      const response = await applicationService.apply(
        advertisementId,
        authItem[0].user.id,
        token
      );
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  // Function to handle page changes 
  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
  };
  const handlePaginationSizeChange = (value) => {
    setPageSize(value);
    console.log(pageSize);
  };

  // Defined advertisement amounts to show
  const paginationOptions = [
    { key: 2, text: "2 Ads", value: 2 },
    { key: 10, text: "10 Ads", value: 10 },
    { key: 25, text: "25 Ads", value: 25 },
    { key: 50, text: "50 Ads", value: 50 },
    { key: 100, text: "100 Ads", value: 100 },
  ];

  return (
    <div>
      <Table>
        <Table.Body>
          {ads.map((ad) => (
            <Table.Row key={ad.id}>
              <Table.Cell>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>{ad.jobTitle}</Card.Header>
                    <Card.Meta>{ad.location.name}</Card.Meta>
                    <Card.Description>{ad.description}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name="user" />
                      10 Friends
                    </a>
                  </Card.Content>
                  {authItem[0].user.userType !== 1 ? (
                    <Button
                      color="teal"
                      onClick={() => history.push("/login")}
                    >
                      Apply
                    </Button>
                  ) : (
                    <Button color="teal" onClick={() => apply(ad.id)}>
                      Apply
                    </Button>
                  )}
                </Card>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Pagination
        boundaryRange={0}
        firstItem={null}
        lastItem={null}
        activePage={activePage}
        onPageChange={handlePaginationChange}
        siblingRange={1}
        totalPages={totalPageSize}
      />
      <Dropdown
        onChange={(e, data) => {
          setActivePage(1);
          setPageSize(data.value);
          handlePaginationSizeChange(data.value);
        }}
        selection
        defaultValue={pageSize}
        text={pageSize + " - Ads"}
        style={{ float: "right" }}
        options={paginationOptions}
      />
    </div>
  );
}
