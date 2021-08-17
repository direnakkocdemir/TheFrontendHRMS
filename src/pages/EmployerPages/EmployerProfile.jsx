import React, { useState, useEffect } from "react";
import EmployerProfileBox from "../../layouts/EmployerProfileBox";
import EmployerAboutBox from "../../layouts/EmployerInfos/EmployerAboutBox";
import EmployerAdsBox from "../../layouts/EmployerInfos/EmployerAdsBox";

export default function EmployerProfile() {

  return (
    <div style={{ width: "100%", display: "flex", alignItems: "center", flexDirection: "column", minHeight: "80vh" }}>
      <EmployerProfileBox  />
      <EmployerAboutBox />
      <EmployerAdsBox  />
    </div>
  );
}
