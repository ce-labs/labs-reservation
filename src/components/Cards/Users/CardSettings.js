import React, {useState, useEffect} from "react";
import { UsersClient } from "../../../clients/UsersClient";
import Modal from 'react-modal';
import {toast, Toaster} from 'react-hot-toast';
import { sleep } from "../../../assets/utils/Sleep";
import { checkMailFormat, checkPhoneFormat } from "../../../assets/utils/CheckFomats";
import { useHistory } from "react-router-dom";
 

const customStyles = { content: { top: '50%', left: '58%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)' }, };

export default function CardSettings({currentUser}) {

  const [modalIsOpen, setIsOpen] = useState(false);


  const [userData, setUserData] = useState({});
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [userType, setUserType] = useState('');

  let history = useHistory();
  let usersClient = new UsersClient();

  useEffect(() => { 
    getUserData();
  }, [])

  const openModal = () => {setIsOpen(true)};
  const closeModal = () => {setIsOpen(false)};

  const getUserData = async() => {
    const currentUserData = await usersClient.getSingleUser(currentUser);
    setUserData(currentUserData.data);
    verifyUserStatus(currentUserData.data.userStatus);
    verifyUserType(currentUserData.data.userType);
  }

  const handleInputChangeForEmail = async(e) => {
    var value = e.target.value;
    setNewEmail(value);
  }
  const handleInputChangeForPhone = async(e) => {
    var value = e.target.value;
    setNewPhone(value);
  }
  const handleInputChangeForPassword = async(e) => {
    var value = e.target.value;
    setNewPassword(value);
  }

  const verifyUserType = (type) => {
    switch (type) {
      case 'admin':
        type = 'Administrador'
        break;
      case 'coordinationStaff':
        type = 'Personal Asistente'
        break;
      case 'teachingStaff':
        type = 'Personal Administrativo'
        break;
      case 'operator':
        type = 'Operador'
        break;  
      default:
        break;
    }
    setUserType(type);
  }

  const verifyUserStatus = (status) => {
    if(status === 'active'){
      setUserStatus('Activo')
    } else if(status === 'inactive'){
      setUserStatus('Inactivo')
    }    
  }


  const verifyInputData = () => {
    if(newEmail === ''){ setNewEmail(userData.mail) } 
    if(newPhone === '') { setNewPhone(userData.phone) }
    if(newPassword === '') { setNewPassword(userData.password) }

    if(!checkMailFormat(userData.mail) ||  !checkPhoneFormat(userData.phone)) {
      toast.error('Formato de Correo Electrónico o Número Telefónico Incorrecto ...')
    } else {
      openModal();
    }
  }

  const updateUser = async() => {
    const clientResponse = await usersClient.updatePersonalInformation(userData.userId, newEmail, newPhone, newPassword);
    switch (clientResponse) {
        case '☑️ The user was modified successfully ... ':
            toast.success('Usuario actualizado exitosamente.');
            sleep(2000).then(()=>{
              closeModal();
              window.location.reload();
              //history.push('/app/profile');
          })
            break;
        default:
            break;
    }

  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">{userData.firstName} {userData.lastName} </h6>

          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-500 text-sm mt-3 mb-6 font-bold uppercase">
              Información General 
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Identificación
                  </label>
                  <input
                    readOnly="true"
                    type="text"
                    className="border-0 px-3 py-3 bg-blueGray-200 rounded text-sm shadow   w-full  duration-150"
                    defaultValue={userData.userId}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Tipo de Usuario
                  </label>
                  <input
                    readOnly="true"
                    type="email"
                    className="border-0 px-3 py-3 bg-blueGray-200 rounded text-sm shadow   w-full  duration-150"
                    defaultValue={userType}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Estado de Usuario
                  </label>
                  <input
                    readOnly="true"
                    type="text"
                    className="border-0 px-3 py-3 bg-blueGray-200 rounded text-sm shadow   w-full  duration-150"
                    defaultValue={userStatus}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Activo desde
                  </label>
                  <input
                    readOnly="true"
                    type="text"
                    className="border-0 px-3 py-3 bg-blueGray-200 rounded text-sm shadow   w-full  duration-150"
                    defaultValue={userData.creationDate}
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-500 text-sm mt-3 mb-6 font-bold uppercase">
              Información de Contacto
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={userData.mail}
                    onChange={handleInputChangeForEmail}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Número Telefónico
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={userData.phone}
                    onChange={handleInputChangeForPhone}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Contraseña 
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={userData.password}
                    onChange={handleInputChangeForPassword}
                  />
                </div>
              </div>
              <div className="w-full lg:w-8/12 px-4" style={{marginLeft: 'auto', paddingTop:'25px'}}>
                <a
                  className="github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-darkBlue-001 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  onClick={verifyInputData}
                >
                  <i class="fas fa-sign-in-alt"></i> Actualizar Información
                </a>
              </div>
       
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

          </form>
        </div>
      </div>
      <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2><b>Sistema de Reservación de Laboratorios</b></h2>
        <div>¿Está seguro que desea actualizar su información de usuario?</div>
        <form style={{marginTop:'20px'}}>
          <input />
          <button onClick={closeModal} style={{marginRight:'20px', color:'red'}}>Cancelar</button>
          <button type="button" onClick={updateUser} style={{color:'green'}}>Actualizar Información</button>
        </form>
      </Modal>

    </div>
    </>
  );
}
