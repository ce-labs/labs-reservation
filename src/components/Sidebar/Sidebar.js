/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [userType, setUserType] = useState("");
  const [userTypeTitle, setUserTypeTitle] = useState("");

  const getUserData = async () => {
    const unparsedUserData = await localStorage.getItem("userData");
    let userData = JSON.parse(unparsedUserData);
    setUserType(userData.userType);
    setTitle(userData.userType);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const setTitle = async (currentUserType) => {
    switch (currentUserType) {
      case "admin":
        setUserTypeTitle("Vista Administrador");
        break;
      case "operador":
        setUserTypeTitle("Vista Operador");
        break;
      case "coordinationStaff":
        setUserTypeTitle("Vista Asistente Logística");
        break;
      case "teachingStaff":
        setUserTypeTitle("Vista Profesor");
        break;
      default:
        break;
    }
  };

  const setUsersActions = () => {
    if (userType === "operator" || userType === "teachingStaff") {
      return <></>;
    } else {
      return (
        <>
          <Link
            className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
            to="/app/users"
          >
            <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i>{" "}
            Usuarios
          </Link>
        </>
      );
    }
  };

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-bl-
            
            
            ueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/app/home"
          >
            Laboratorios CE
          </Link>
          {/* User */}
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    Laboratorios CE
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              {userTypeTitle}
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                  to="/app/home"
                >
                  <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i>{" "}
                  Reservaciones
                </Link>
              </li>

              <li className="items-center">{setUsersActions()}</li>

              <li className="items-center">
                <Link
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                  to="/app/profile"
                >
                  <i className="fas fa-user-circle text-blueGray-400 mr-2 text-sm"></i>{" "}
                  Perfil
                </Link>
              </li>
            </ul>
          </div>
          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            <li className="items-center">
              <a
                className="text-black hover:text-blueGray-700 align-middle text-xs mt-0 mb-2"
                target="_blank"
              >
                Sistema de Reservación de Laboratorios v1.0.0
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
