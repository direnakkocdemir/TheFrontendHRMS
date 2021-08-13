import React,{useState,useEffect} from "react";
import EmployerProfileBox from "../../layouts/EmployerProfileBox";
import EmployerAboutBox from "../../layouts/EmployerInfos/EmployerAboutBox";
import EmployerAdsBox from "../../layouts/EmployerInfos/EmployerAdsBox";
import { useSelector } from "react-redux";

export default function EmployerProfile() {

  const { authItem } = useSelector((state) => state.auth);

  let [employerId, setEmployerId] = useState(0);

  useEffect(() => {
    async function fetchMyApi() {
      setEmployerId(authItem[0].user.id);
    };
    fetchMyApi();
  }, []);

  return (
    <div style={{width:"100%", display:"flex",alignItems:"center", flexDirection:"column"}}>
      <EmployerProfileBox id={employerId}/>
      <EmployerAboutBox id={employerId}/>
      <EmployerAdsBox id={employerId}/>
    </div>
  );
}
