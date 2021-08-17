import React, { useState, useEffect } from "react";
import {
  Card,
  Icon,
  Table,
  Button,
  Pagination,
  Dropdown,
} from "semantic-ui-react";
import AdvertisementService from "../../services/advertisementService";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function EmployerAdsBox() {
  //Redux states to use in the component
  const { authItem } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);

  //States to keep the advertisements 
  const [ads, setAds] = useState([]);
  //States to keep the page informations
  let [activePage, setActivePage] = useState(1);
  let [pageSize, setPageSize] = useState(2);
  let [totalPageSize, setTotalPageSize] = useState(0);

  //Service to use the Http requests 
  let advertisementService = new AdvertisementService();
  const history = useHistory();// For using the router to change the component

  //Function to get all advertisements by specific page and amount
  async function getEmployerAds() {
    try {
      const ads = await advertisementService.getAdvertisementByEmployerName(
        authItem[0].user.name,
        activePage,
        pageSize,
        authItem[0].user.token
      );
      toast.success(ads.data.message)
      setAds(ads.data.data);
      setTotalPageSize(5);
    } catch (err) {
      toast.error(err.response)
    }
  }
  //Function to close the advertisement by advertisement id
  async function closeAdvertisement(closeId) {
    try {
      const response = await advertisementService.closeAdvertisement({ id: closeId }, token);
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }
  //hook for taking action to getting the about
  //if activePage, pageSize or authItem changes, hook works again
  useEffect(() => {
    getEmployerAds();
  }, [activePage, pageSize, authItem]);

  //Fuction to go to setting compnent
  function goSettings() {
    history.push("/jsabout");
  }
  // Function to handle page changes 
  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
  };
  const handlePaginationSizeChange = (value) => {
    setPageSize(value);
  };

  //Defined page options 
  const paginationOptions = [
    { key: 2, text: "2 İlan", value: 2 },
    { key: 10, text: "10 İlan", value: 10 },
    { key: 25, text: "25 İlan", value: 25 },
    { key: 50, text: "50 İlan", value: 50 },
    { key: 100, text: "100 İlan", value: 100 },
  ];

  //Function to check the applicants
  //Sending advertisement id to component
  const checkApplicants = (adId) => {
    history.push("/employer/applications/" + adId);
  };
  
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "70vw",
          height: "100%",
          border: "1px solid #CCD5AE",
          borderRadius: "5px",
          marginBottom: "5vh",
        }}
      >
        <div
          style={{
            backgroundColor: "#F7F7F7",
            height: "50px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: "20px",
            paddingRight: "20px",
            borderBottom: "1px solid #CCD5AE",
          }}
        >
          <h5 style={{ margin: "0" }}>Job Ads</h5>
          <Button icon="setting" onClick={goSettings}></Button>
        </div>
        <div style={{ padding: "20px" }}>
          <Table>
            <Table.Body>
              {ads ? (
                ads.map((ad) => (ad.active &&
                  <Table.Row key={ad.id}>
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

                      <Card.Content extra>
                        <div className="ui two buttons">
                          <Button
                            color="green"
                            onClick={() => checkApplicants(ad.id)}
                          >
                            Check
                          </Button>
                          <Button color="red" onClick={() => closeAdvertisement(ad.id)}>Close</Button>
                        </div>
                      </Card.Content>
                    </Card>
                  </Table.Row>
                ))
              ) : (
                <Table.Row></Table.Row>
              )}
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
      </div>
    </div>
  );
}
