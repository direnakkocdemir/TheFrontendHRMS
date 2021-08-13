import React, { Component, useState } from "react";
import ImageService from "../../services/imageService";
import { Card, Button, Input,Dropdown } from "semantic-ui-react";
import {toast} from 'react-toastify'
import { useSelector } from "react-redux";



export default function AddImage() {
  
  const { authItem } = useSelector((state) => state.auth);

const [imageType, setImageType] = useState(0)

  const fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

   const fileUploadHandler = () => {
    console.log("fileUploadHandler" + this.state.selectedFile);
    const fd = new FormData();
    fd.append(
      "multipartFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    console.log(fd);
    let imageService = new ImageService();
    if(this.props.userId>0){
      console.log(fd);
      imageService
      .postImage(1, this.props.userId, fd,authItem[0].user.token)
      .then((res) => {
        console.log(res.data)
        toast.success('Image Added');
        // this.props.updateCvValues();
      })
      .catch((result) => {
        toast.error(result);
        // toast.error(result.response.data.message);
      });
    }else{
      toast.error("Please Login");
    }
    
  };

   const imageTypeHandler = (e, { value }) =>{
    this.setState({imageType:value});
  }
  return (
    <div>
      <Card fluid>
        <Card.Content header="Upload Image" />
        <Card.Content style={{display:"flex"}}>
          <Input
            label={<Dropdown defaultValue="0" options={this.state.options} onChange={this.imageTypeHandler}/>}
            labelPosition='left'
            type="file"
            onChange={this.fileSelectedHandler}
            ref={(fileInput) => (this.fileInput = fileInput)}
          />
          
        <Button
            size='large'
            color={"green"}
            onClick={this.fileUploadHandler}
            disabled={this.state.selectedFile == null}
          >
            Upload
          </Button>
          
        </Card.Content>
      </Card>
    </div>
  );
}

// class AddImage extends Component {

//   state={imageType:0}
//   state={selectedFile:null}
  
//   state={options : [
//     { key: "Photo Type", text: "Photo Type", value: "0" },
//     { key: "Profile", text: "Profile", value: "1" },
//     { key: "Background", text: "Background", value: "2" },
//   ]};

//   fileSelectedHandler = (event) => {
//     this.setState({
//       selectedFile: event.target.files[0],
//     });
//   };

//   fileUploadHandler = () => {
//     console.log("fileUploadHandler" + this.state.selectedFile);
//     const fd = new FormData();
//     fd.append(
//       "multipartFile",
//       this.state.selectedFile,
//       this.state.selectedFile.name
//     );
//     console.log(fd);
//     let imageService = new ImageService();
//     if(this.props.userId>0){
//       console.log(fd);
//       imageService
//       .postImage(1, this.props.userId, fd)
//       .then((res) => {
//         console.log(res.data)
//         toast.success('Image Added');
//         // this.props.updateCvValues();
//       })
//       .catch((result) => {
//         toast.error(result);
//         // toast.error(result.response.data.message);
//       });
//     }else{
//       toast.error("Please Login");
//     }
    
//   };

//   imageTypeHandler = (e, { value }) =>{
//     this.setState({imageType:value});
//   }

  
// render(){
//   return (
//     <div>
//       <Card fluid>
//         <Card.Content header="Upload Image" />
//         <Card.Content style={{display:"flex"}}>
//           {/* <Input
//             label={<Dropdown defaultValue="0" options={this.state.options} onChange={this.imageTypeHandler}/>}
//             labelPosition='left'
//             type="file"
//             onChange={this.fileSelectedHandler}
//             ref={(fileInput) => (this.fileInput = fileInput)}
//           /> */}
//           <input
//             type="file"
//             onChange={this.fileSelectedHandler}
//             ref={(fileInput) => (this.fileInput = fileInput)}
//           />
//         <Button
//             size='large'
//             color={"green"}
//             onClick={this.fileUploadHandler}
//             disabled={this.state.selectedFile == null}
//           >
//             Upload
//           </Button>
          
//         </Card.Content>
//       </Card>
//     </div>
//   );
// }
// }

// export default AddImage;