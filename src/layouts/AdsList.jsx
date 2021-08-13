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
  const { authItem } = useSelector((state) => state.auth);

  const jobTitle = props.location.state.jobTitle;
  const location = props.location.state.location;
  const workTime = props.location.state.workTime;

  const [ads, setAds] = useState([]);
  let [activePage, setActivePage] = useState(1);
  let [pageSize, setPageSize] = useState(2);
  let [totalPageSize, setTotalPageSize] = useState(0);

  let advertisementService = new AdvertisementService();
  let applicationService = new ApplicationService();
  const history = useHistory();

  async function getAll() {
    const response = await advertisementService.getAllPages(
      activePage,
      pageSize
    );
    setAds(response.data.data);
  }

  async function getAllByJobTitle(jobTitle) {
    const response = await advertisementService.getAdvertisementByJobTitle(
      jobTitle,
      activePage,
      pageSize
    );
    setAds(response.data.data);
  }
  async function getAllByLocation(location) {
    const response = await advertisementService.getAdvertisementByLocation(
      location,
      activePage,
      pageSize
    );
    setAds(response.data.data);
  }
  async function getAllByWorkTime(workTime) {
    const response = await advertisementService.getAdvertisementByWorkTime(
      workTime,
      activePage,
      pageSize
    );
    setAds(response.data.data);
  }
  async function getAllByJobTitleAndLocation(jobTitle, location) {
    const response =
      await advertisementService.getAdvertisementByJobTitleAndLocation(
        jobTitle,
        location,
        activePage,
        pageSize
      );
    setAds(response.data.data);
  }
  async function getAllByJobTitleAndWorkTime(jobTitle, workTime) {
    const response =
      await advertisementService.getAdvertisementByJobTitleAndWorkTime(
        jobTitle,
        workTime,
        activePage,
        pageSize
      );
    setAds(response.data.data);
  }
  async function getAllByLocationAndWorkTime(location, workTime) {
    const response =
      await advertisementService.getAdvertisementByLocationAndWorkTime(
        location,
        workTime,
        activePage,
        pageSize
      );
    setAds(response.data.data);
  }
  async function getAllByAll(jobTitle, location, workTime) {
    const response =
      await advertisementService.getAdvertisementByJobTitleAndLocationAndWorkTime(
        jobTitle,
        location,
        workTime,
        activePage,
        pageSize
      );
    setAds(response.data.data);
  }

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

  async function apply(advertisementId) {
    try{
      console.log(authItem[0].user.token);
      const response = await applicationService.apply(
      advertisementId,
      authItem[0].user.id,
      authItem[0].user.token
    );
    toast.success(response.data.message);
    }catch(err){
      toast.error(err.response.data.message);
    }
  }

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
  };

  const handlePaginationSizeChange = (value) => {
    setPageSize(value);
    console.log(pageSize);
  };

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
