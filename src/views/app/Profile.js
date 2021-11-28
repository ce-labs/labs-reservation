import React from "react";
import {Toaster} from 'react-hot-toast';
import GeneralInfo from "../../components/Cards/Profile/GeneralInfo";
import UpdateProfile from "../../components/Cards/Profile/UpdateProfile";

export default function Profile() {
  return (
    <>
    <Toaster />
      <div className="flex flex-wrap" style={{paddingTop:'150px', paddingLeft:'50px', paddingRight:'50px'}}>
        <div className="w-full lg:w-4/12 px-4">
          <GeneralInfo />
        </div>
        <div className="w-full lg:w-8/12 px-4">
          <UpdateProfile />
        </div>
      </div>
    </>
  );
}
