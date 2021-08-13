import React, { useState, useEffect } from "react";
import {
  Card,
  Icon,
  Menu,
  Table,
  Button,
  Pagination,
  Dropdown,
} from "semantic-ui-react";
import AdvertisementService from "../../services/advertisementService";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ApplicationService from "../../services/applicationService";
import { toast } from "react-toastify";

export default function EmployerAdsBox() {
  const { authItem } = useSelector((state) => state.auth);

  const [ads, setAds] = useState([]);
  let [activePage, setActivePage] = useState(1);
  let [pageSize, setPageSize] = useState(2);
  let [totalPageSize, setTotalPageSize] = useState(0);

  let advertisementService = new AdvertisementService();
  const history = useHistory();

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
  useEffect(() => {
    getEmployerAds();
  }, [activePage, pageSize, authItem]);

  function goSettings() {
    history.push("/jsabout");
  }
  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
  };

  const handlePaginationSizeChange = (value) => {
    setPageSize(value);
  };

  const paginationOptions = [
    { key: 2, text: "2 İlan", value: 2 },
    { key: 10, text: "10 İlan", value: 10 },
    { key: 25, text: "25 İlan", value: 25 },
    { key: 50, text: "50 İlan", value: 50 },
    { key: 100, text: "100 İlan", value: 100 },
  ];

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
                ads.map((ad) => (
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
                          <Button color="red">Close</Button>
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
