import React, { useEffect, useState } from "react";
import { UsersClient } from "../../../clients/UsersClient";
import Modal from 'react-modal';
import CardSettings from "../CardSettings";

const customStyles = { content: { top: '50%', left: '58%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)' }, };

export default function UpdateProfile() {

    let usersClient = new UsersClient();
    const [userData, setUserData] = useState([]);
    const [modalUpdateProfileIsOpen, setUpdateProfileIsOpen] = useState(false);


    const openUpdateProfileModal = () => {setUpdateProfileIsOpen(true)};
    const closeUpdateProfileModal = () => {setUpdateProfileIsOpen(false)};

  
    useEffect(() => {
      getUserData();
    }, [])
  
    const getUserData = async() => {
        const currentData = await usersClient.getSingleUser(localStorage.getItem('userId'));
        setUserData(currentData.data);
        //console.log(currentData.data)
    }

    const verifyUserType = (userType) => {
        if (userType === 'admin') {
            return('Administrador')
        } else if (userType === 'teachingStaff') {
            return('Personal Administrativo')
        } else if (userType === 'coordinationStaff') {
            return('Personal Asistente')
        } else if (userType === 'operator') {
            return('Operador')
        }
      }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0 mt-6">
        <div className="rounded-t bg-spotify-grey mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-600 text-xl font-bold">Información de Usuario</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
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
              <div className="w-full lg:w-6/12 px-4">
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
          <hr className="mt-6 border-b-1 border-blueGray-300" />
          <div className="flex flex-wrap mt-6 relative">
            <div className="w-1/2">
                <a
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  {/*<small>¿Olvidó su contraseña?</small>*/}
                </a>
            </div>
            <div className="w-1/2 text-right">
            <button 
                  className="bg-darkBlue-001 active:bg-lightBlue-600 text-white 2 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                    <a onClick={openUpdateProfileModal}>
                        <i class="fas fa-edit"></i> Actualizar Información
                    </a>
                </button>
          </div>
          </div>

   
        </div>
      </div>
      <Modal
        isOpen={modalUpdateProfileIsOpen}
        onRequestClose={closeUpdateProfileModal}
        style={customStyles}
      >
        <CardSettings currentUser={localStorage.getItem('userId')} />
      </Modal>
    </>
  );
}
