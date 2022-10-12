import UsersTable from "components/Cards/Users/UsersTable";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router";
import { sleep } from "utils/Sleep";

export default function Users() {
  const [userData, setUserData] = useState([]);

  let history = useHistory();

  const getUserData = async () => {
    const unparsedUserData = await localStorage.getItem("userData");
    let userData = JSON.parse(unparsedUserData);
    setUserData(userData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (
    userData.userType === "operator" ||
    userData.userType === "teachingStaff"
  ) {
    toast.error("No tiene los permisos para acceder a esta sección");
    sleep(1000).then(() => {
      history.push("/app");
    });
  }

  return (
    <>
      <div className="flex flex-wrap" style={{paddingTop:'150px', paddingLeft:'50px', paddingRight:'50px'}}>
        <div className="w-full ">
        <UsersTable color="light"/>

        </div>
      </div>
    </>
  );
}
