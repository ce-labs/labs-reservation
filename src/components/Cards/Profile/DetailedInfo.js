import { customStyles } from "constants/styles";
import React, { useEffect, useState } from "react";
import UpdateInfo from "./UpdateInfo";
import Modal from 'react-modal';

export default function DetailedInfo() {
  const [userData, setUserData] = useState([]);
  const [modalUpdateProfileIsOpen, setUpdateProfileIsOpen] = useState(false);

  const openUpdateProfileModal = () => {
    setUpdateProfileIsOpen(true);
  };
  const closeUpdateProfileModal = () => {
    setUpdateProfileIsOpen(false);
  };

  const getUserData = async () => {
    const unparsedUserData = await localStorage.getItem("userData");
    let userData = JSON.parse(unparsedUserData);
    setUserData(userData);
  };

  useEffect(() => {
    getUserData();
  }, []);

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

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0 mt-6">
        <div className="rounded-t mb-0 px-4 py-3 border-0 bg-white">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700"></h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-primary text-white active:bg-primary-light text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={openUpdateProfileModal}
              >
                <i class="fas fa-edit"></i> Actualizar
              </button>
            </div>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-blueGray-100">
          <form>
            <h6 className="text-blueGray-500 text-sm mt-3 mb-6 font-bold uppercase">
              Infomación Personal
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nombre
                  </label>
                  <input
                    disabled="true"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-black bg-spotify-grey-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={userData.firstName}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Apellidos
                  </label>
                  <input
                    disabled="true"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-black bg-spotify-grey-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={userData.lastName}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Tipo de Usuario
                  </label>
                  <input
                    disabled="true"
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-black bg-spotify-grey-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={verifyUserType(userData.userType)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Activo desde
                  </label>
                  <input
                    disabled="true"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-black bg-spotify-grey-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={userData.creationDate}
                  />
                </div>
              </div>
            </div>

            <h6 className="text-blueGray-500 text-sm mt-3 mb-6 font-bold uppercase">
              Información de Contacto
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Correo Electrónico
                  </label>
                  <input
                    disabled="true"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-black bg-spotify-grey-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={userData.mail}
                  />
                </div>
              </div>
              <div
                className="w-full lg:w-6/12 px-4"
                style={{ paddingBottom: 15 }}
              >
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Número Telefónico
                  </label>
                  <input
                    disabled="true"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-black bg-spotify-grey-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={userData.phone}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Modal
        isOpen={modalUpdateProfileIsOpen}
        onRequestClose={closeUpdateProfileModal}
        style={customStyles}
      >
        <UpdateInfo />
      </Modal>
    </>
  );
}
