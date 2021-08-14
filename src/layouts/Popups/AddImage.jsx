import React, { Component, useState } from "react";
import ImageService from "../../services/imageService";
import { Card, Button, Input,Dropdown } from "semantic-ui-react";
import {toast} from 'react-toastify'
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


const AddImage=({props}) => {

  const { authItem } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);

  const [imageType, setImageType] = useState({typeId:0});
  const [selectedFile, setSelectedFile] = useState();

   const options = [
    { key: "Photo Type", text: "Photo Type", value: "0" },
    { key: "Profile", text: "Profile", value: "1" },
    { key: "Background", text: "Background", value: "2" },
  ];

  const history = useHistory();
  const fileSelectedHandler = (event) => {
    setSelectedFile({
      selectedFile: event.target.files[0],
    });
  };

  const fileUploadHandler = async () => {
    const fd = new FormData();
    fd.append(
      "multipartFile",
      selectedFile.selectedFile
    );
    console.log(selectedFile);
    let imageService = new ImageService();
    if(authItem[0].user.id>0){
      await imageService
      .postImage(imageType.typeId,authItem[0].user.id, fd,token)
      .then((res) => {
        toast.success('Image Added');
        history.push("/profile")
      })
      .catch((result) => {
        toast.error(result.response.message);
      });
    }else{
      toast.error("Please Login");
    }
    
  };

  const imageTypeHandler = (e, { value }) =>{
    setImageType(...imageType,{typeId:value});
  }

  return (
    <div>
      <Card fluid>
        <Card.Content header="Upload Image" />
        <Card.Content style={{display:"flex"}}>
          <Input
            label={<Dropdown defaultValue="0" options={options} onChange={imageTypeHandler}/>}
            labelPosition='left'
            type="file"
            onChange={fileSelectedHandler}
            ref={(fileInput) => (fileInput = fileInput)}
          />
          {/* <input
            type="file"
            onChange={this.fileSelectedHandler}
            ref={(fileInput) => (this.fileInput = fileInput)}
          /> */}
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