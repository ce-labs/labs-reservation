/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import { decrypt } from "../../assets/utils/Security";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");

  const setUsersActions = () => {
    if (
      localStorage.getItem("userType") === "operator" ||
      localStorage.getItem("userType") === "teachingStaff"
    ) {
      return <></>;
    } else {
      return (
        <>
          <Link
            className={
              "text-xs uppercase py-3 font-bold block " +
              (window.location.href.indexOf("/app/users") !== -1
                ? "text-black hover:text-blueGray-700 "
                : "text-blueGray-800 hover:text-blueGray-600")
            }
            to="/app/users"
          >
            <i
              className={
                "fas fa-users mr-2 text-sm " +
                (window.location.href.indexOf("/app/users") !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>{" "}
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
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/app"
          >
            CE LABS
          </Link>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/app"
                  >
                    CE Labs
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
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/app/reservations") !== -1
                      ? "text-black hover:text-blueGray-700"
                      : "text-blueGray-800 hover:text-blueGray-600")
                  }
                  to="/app/reservations"
                >
                  <i
                    className={
                      "fas fa-home mr-2 text-sm " +
                      (window.location.href.indexOf("/app/reservations") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Reservaciones
                </Link>
              </li>

              <li className="items-center">{setUsersActions()}</li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/app/profile") !== -1
                      ? "text-black hover:text-blueGray-700 "
                      : "text-blueGray-800 hover:text-blueGray-600")
                  }
                  to="/app/profile"
                >
                  <i
                    className={
                      "fas fa-user mr-2 text-sm " +
                      (window.location.href.indexOf("/app/profile") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
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
                Sistema de Reservación de Laboratorios v1.0
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
