import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { useHistory } from "react-router-dom";
import { UsersClient } from "../../clients/UsersClient";
import CardSettings from "../../components/Cards/CardSettings";

const customStyles = { content: { top: '50%', left: '58%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)' }, };

export default function Profile() {

  let history = useHistory();

  const [modalLogoutIsOpen, setLogoutIsOpen] = useState(false);
  const [modalUpdateProfileIsOpen, setUpdateProfileIsOpen] = useState(false);
  const [userData, setUserData] = useState({});

  let usersClient = new UsersClient();

  const openModal = () => {setLogoutIsOpen(true)};
  const closeModal = () => {setLogoutIsOpen(false)};


  const openUpdateProfileModal = () => {setUpdateProfileIsOpen(true)};
  const closeUpdateProfileModal = () => {setUpdateProfileIsOpen(false)};

  useEffect(() => { 
    getUserData();
  }, [])

  const getUserData = async() => {
    const currentUserData = await usersClient.getSingleUser(localStorage.getItem('userId'));
    setUserData(currentUserData.data);
  }

  const logout = () => {
    localStorage.removeItem('activeSession');
    closeModal();
    localStorage.setItem('userData', {"userId":'', "password":''});
    history.push('/auth');
  }
  
  return (
    <>
      <main className="profile-page">
        <section className="relative  h-500-px"></section>
        <section className="relative py-6 ">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={require("../../assets/img/user.png").default}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-darkBlue-001 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={openModal}
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          0
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Reservaciones
                        </span>
                      </div>
                      
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block  tracking-wide text-green-001">
                          activo
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Estado de Usuario
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    {userData.firstName} {userData.lastName}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                    Cartago, Costa Rica
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                    Tipo de Usuario: {userData.userType}
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                    Instituto Tecnológico de Costa Rica
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-history mr-2 text-lg text-blueGray-400"></i>
                    Activo desde: {userData.creationDate}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i> {userData.mail} <br/>
                      <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i> {userData.phone}
                      </p>
                      <a
                        href="#"
                        className="font-normal text-lightBlue-500"
                        onClick={openUpdateProfileModal}
                      >
                        Actualizar Información
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div>
      <Modal
        isOpen={modalLogoutIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2><b>Sistema de Reservación de Laboratorios</b></h2>
        <div>¿Está seguro que desea cerrar sesión?</div>
        <form style={{marginTop:'20px'}}>
          <input />
          <button onClick={closeModal} style={{marginRight:'20px', color:'red'}}>Cancelar</button>
          <button onClick={logout} style={{color:'green'}}>Cerrar Sesión</button>
        </form>
      </Modal>

      <Modal
        isOpen={modalUpdateProfileIsOpen}
        onRequestClose={closeUpdateProfileModal}
        style={customStyles}
      >
        <CardSettings />
      </Modal>

    </div>
    </>
  );
}
