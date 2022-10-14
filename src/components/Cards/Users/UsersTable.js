import { UsersClient } from "communication/UsersClient";
import UpdateUserDropdown from "components/Dropdowns/UpdateUserDropdown";
import { customStyles } from "constants/styles";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import CreateUser from "./CreateUser";

export default function UsersTable({ color }) {
  const [userData, setUserData] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("");
  const [createUserIsOpen, setCreateUserIsOpen] = useState(false);

  let usersClient = new UsersClient();

  const openModal = () => {
    setCreateUserIsOpen(true);
  };
  const closeModal = () => {
    setCreateUserIsOpen(false);
  };

  const getAllUsers = async () => {
    var currentUsers = await usersClient.getAllUsers();

    const unparsedUserData = await localStorage.getItem("userData");
    let currentUser = JSON.parse(unparsedUserData);

    var currentData = await usersClient.getSingleUser(currentUser.userId);
    for (var i = 0; i < currentUsers.length; i++) {
      if (currentUsers[i].userId === currentData.data.userId) {
        currentUsers.splice(i, 1);
      }
    }
    setCurrentUsers(currentUsers);
  };

  const getUserData = async () => {
    const unparsedUserData = await localStorage.getItem("userData");
    let userData = JSON.parse(unparsedUserData);
    setUserData(userData);
  };

  useEffect(() => {
    getUserData();
    getAllUsers();
  }, []);

  const handleInputChangeForFilter = async (e) => {
    var value = e.target.value;
    switch (value) {
      case "Administrador":
        value = "admin";
        break;
      case "Personal Asistente":
        value = "coordinationStaff";
        break;
      case "Personal Administrativo":
        value = "teachingStaff";
        break;
      case "Operador":
        value = "operator";
        break;
      default:
        break;
    }
    setFilter(value);
  };

  const handleInputChangeForCategory = async (e) => {
    var value = e.target.value;
    setCategory(value);
  };

  const verifyUserType = (userType) => {
    if (userType === "admin") {
      return "Administrador";
    } else if (userType === "teachingStaff") {
      return "Personal Administrativo";
    } else if (userType === "coordinationStaff") {
      return "Personal Asistente";
    } else if (userType === "operator") {
      return "Operador";
    }
  };

  const verifyUserStatus = (userStatus) => {
    if (userStatus === "active") {
      return (
        <>
          <i className="fas fa-circle text-emerald-500 mr-2"></i> Activo{" "}
        </>
      );
    } else if (userStatus === "inactive") {
      return (
        <>
          <i className="fas fa-circle text-orange-500 mr-2"></i> Inactivo{" "}
        </>
      );
    }
  };

  const setCreateUserButton = () => {
    if (userData.userType !== "admin") {
      return <></>;
    } else {
      return (
        <>
          <button
            className="bg-primary text-white active:bg-primary-light text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={openModal}
          >
            <i className="fas fa-plus"></i> Crear Nuevo Usuario
          </button>
        </>
      );
    }
  };

  const setUserActions = (
    userId,
    password,
    firstName,
    lastName,
    userType,
    userStatus,
    mail,
    phone
  ) => {
    if (userData.userType != "admin") {
      return <></>;
    } else {
      return (
        <>
          <UpdateUserDropdown
            userData={{
              userId: userId,
              password: password,
              firstName: firstName,
              lastName: lastName,
              userType: userType,
              userStatus: userStatus,
              mail: mail,
              phone: phone,
            }}
          />
        </>
      );
    }
  };

  const searchUsers = async () => {
    if (category === "option" || category === "") {
      toast.error("Debe seleccionar alguna opción");
    } else {
      const response = await usersClient.searchUsers(category, filter);

      const unparsedUserData = await localStorage.getItem("userData");
      let currentUser = JSON.parse(unparsedUserData);
  
      var currentData = await usersClient.getSingleUser(currentUser.userId);
      for (var i = 0; i < currentUsers.length; i++) {
        if (response[i].userId === currentData.data.userId) {
          response.splice(i, 1);
        }
      }
      
      if (response.length === 0) {
        toast.error(
          "No se encontraron resultados con las especificaciones indicadas"
        );
      } else {
        toast.success("Mostrando " + response.length + " resultado (s)");
      }
      setCurrentUsers(response);
    }
  };

  if (
    userData.userType === "operator" ||
    userData.userType === "teachingStaff"
  ) {
    return <></>;
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-3/12 " style={{ paddingRight: "20px" }}>
          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
              Filtro
            </label>
            <input
              type="text"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              onChange={handleInputChangeForFilter}
            />
          </div>
        </div>
        <div className="w-full lg:w-3/12 " style={{ paddingRight: "20px" }}>
          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
              Categoría
            </label>
            <select
              name="category"
              id="category"
              onChange={handleInputChangeForCategory}
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            >
              <option value="option">Seleccione una opción</option>
              <option value="firstName">Primer Nombre</option>
              <option value="lastName">Segundo Nombre</option>
              <option value="userId">Identificación</option>
              <option value="userType">Tipo de Usuario</option>
            </select>
          </div>
        </div>

        <div className="w-full lg:w-3/12" style={{ paddingRight: "20px" }}>
          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-100 text-xs font-bold mb-2">
              .
            </label>
            <button
              className="bg-primary text-white active:bg-primary-light  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              type="button"
              onClick={searchUsers}
            >
              <i class="fas fa-search"></i> Buscar Usuario (s)
            </button>
          </div>
        </div>
      </div>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              ></h3>
            </div>
            {setCreateUserButton()}
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Nombre Completo
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Identificación
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Correo Electrónico
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Número Telefónico
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Tipo de Usuario
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Estado de Usuario
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <img
                        src={require("../../../assets/img/user.png").default}
                        className="h-12 w-12 bg-white rounded-full border"
                        alt="..."
                      ></img>{" "}
                      <span
                        className={
                          "ml-3 font-bold " +
                          +(color === "light"
                            ? "text-blueGray-600"
                            : "text-white")
                        }
                      >
                        {item.firstName} {item.lastName}
                      </span>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.userId}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.mail}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.phone}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {verifyUserType(item.userType)}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {verifyUserStatus(item.userStatus)}
                    </td>
                    {/*<TableDropdown userData={{"userId": item.userId, "password":item.password, "firstName":item.firstName, "lastName":item.lastName, "userType":item.userType, "userStatus": item.userStatus, "mail": item.mail, "phone": item.phone} }/>
                     */}
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                      {setUserActions(
                        item.userId,
                        item.password,
                        item.firstName,
                        item.lastName,
                        item.userType,
                        item.userStatus,
                        item.mail,
                        item.phone
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={createUserIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <CreateUser />
      </Modal>
    </>
  );
}
