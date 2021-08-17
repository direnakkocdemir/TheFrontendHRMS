import React, { useState } from "react";
import ImageService from "../../services/imageService";
import { Card, Button, Input, Dropdown } from "semantic-ui-react";
import { toast } from 'react-toastify'
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const AddImage = () => {

  //Redux states to use in the component
  const { authItem } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);

  //State to keep the image type and file to use
  const [imageType, setImageType] = useState({ typeId: 0 });
  const [selectedFile, setSelectedFile] = useState();

  // Defined image type for dropdown
  const options = [
    { key: "Photo Type", text: "Photo Type", value: "0" },
    { key: "Profile", text: "Profile", value: "1" },
    { key: "Background", text: "Background", value: "2" },
  ];

  const history = useHistory();// For using the router to change the component
  // Function to add the image to the state
  const fileSelectedHandler = (event) => {
    setSelectedFile({
      selectedFile: event.target.files[0],
    });
  };
  // Function to handle the changes and post the image 
  const fileUploadHandler = async () => {
    const fd = new FormData(); // Creating a data form for image
    fd.append(
      "multipartFile",
      selectedFile.selectedFile
    );
    // Creating image service to use the HTTP requests 
    let imageService = new ImageService();
    if (authItem[0].user.id > 0) {
      console.log(imageType.typeId);
      await imageService
        .postImage(imageType.typeId, authItem[0].user.id, fd, token)
        .then((res) => {
          toast.success('Image Added');
          history.push("/profile")
        })
        .catch((result) => {
          toast.error(result.response.message);
        });
    } else {
      toast.error("Please Login");
    }

  };
  //Function to handle image type changes
  const imageTypeHandler = (e, { value }) => {
    setImageType(...imageType, { typeId: value });
  }

  return (
    <div style={{ minHeight: "80vh" }}>
      <Card fluid>
        <Card.Content header="Upload Image" />
        <Card.Content style={{ display: "flex" }}>
          <Input
            label={<Dropdown defaultValue="0" options={options} onChange={imageTypeHandler} />}
            labelPosition='left'
            type="file"
            onChange={fileSelectedHandler}
            ref={(fileInput) => (fileInput = fileInput)}
          />
          <Button
            size='large'
            color={"green"}
            onClick={fileUploadHandler}
            disabled={selectedFile == null}
          >
            Upload
          </Button>
        </Card.Content>
      </Card>
    </div>
  );
}


export default AddImage;