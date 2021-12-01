import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import { sleep } from "../../../assets/utils/Sleep";
import { UsersClient } from "../../../clients/UsersClient";

const customStyles = { content: { backgroundColor: '#fff', color: '#000', top: '50%', left: '58%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-80%, -50%)' }, };

export default function GeneralInfo() {

  let usersClient = new UsersClient();
  const [userData, setUserData] = useState([]);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const openLogoutModal = () => {setLogoutModalOpen(true)};
  const closeLogoutModal = () => {setLogoutModalOpen(false)};

  let history = useHistory();

  useEffect(() => {
    getUserData();
  }, [])

  const getUserData = async() => {
      const currentData = await usersClient.getSingleUser(localStorage.getItem('userId'));
      setUserData(currentData.data);
  }


  const logout = () => {
        toast.success('Cerrando Sesión ....');
        localStorage.removeItem('activeSession');
        localStorage.setItem('userId', '');

        sleep(2500).then(()=>{
            history.push('/auth');
          })  
    }


  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-6">
        <div className="px-6">
            <div className=" py-4 w-full  flex justify-center" style={{paddingTop:'30px'}}>
              <div className="relative">
                <img
                  alt="..."
                  //src={userData.profilePicture}
                  src={require("../../../assets/img/profilePicture.png").default}
                  className="shadow-xl rounded-full h-auto align-middle border-none max-w-150-px"
                />
              </div>
            </div>
          <div className="text-center mt-12">

              
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-600 mb-2">
              {userData.firstName}  {userData.lastName}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-600 ">
              <i className="fas fa-user mr-2 text-lg text-blueGray-400"></i>{" "}
              {userData.userId}
            </div>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-600  ">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
              {userData.mail}
            </div>
          </div>
          <div className=" py-6 text-center" style={{paddingBottom:'80px'}}>
            <div className="flex flex-wrap justify-center">
              <div className="mt-12">
                <button 
                style={{paddingBottom:'10px'}}
                  className="bg-darkBlue-001 active:bg-lightBlue-600 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                  onClick={openLogoutModal}
                >
                    <i class="fas fa-sign-in-alt"></i> Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
            isOpen={logoutModalOpen}
            onRequestClose={closeLogoutModal}
            style={customStyles}
        >
            <h2><b>Sistema de Reservación de Laboratorios</b></h2>
            <div>¿Está seguro que desea cerrar sesión?</div>
            <form style={{marginTop:'20px'}}>
              <button onClick={closeLogoutModal} style={{marginRight:'20px',marginLeft:'200px', color:'#d4443c'}}>Cancelar</button>
              <button type="button" onClick={logout} style={{color:'#1db954'}}>Cerrar Sesión</button>
            </form>
        </Modal>
    </>
  );
}
