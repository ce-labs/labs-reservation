import DetailedInfo from "components/Cards/Profile/DetailedInfo";
import GeneralInfo from "components/Cards/Profile/GeneralInfo";
import React from "react";

export default function Profile() {
  return (
    <>
      <div className="flex flex-wrap" style={{paddingTop:'150px', paddingLeft:'50px', paddingRight:'50px'}}>
        <div className="w-full lg:w-4/12 px-4">
          <GeneralInfo />
        </div>
        <div className="w-full lg:w-8/12 px-4">
          <DetailedInfo />
        </div>
      </div>
    </>
  );
}
