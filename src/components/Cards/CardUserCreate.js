import React, {useState, useEffect} from "react";
import Modal from 'react-modal';
import toast from "react-hot-toast";
import { UtilsClient } from "../../clients/UtilsClient";
import { UsersClient } from "../../clients/UsersClient";
import { sleep } from "../../assets/utils/Sleep";
import { checkMailFormat, checkPhoneFormat } from "../../assets/utils/CheckFomats";

const customStyles = { content: { top: '50%', left: '58%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)' }, };


export default function CardCreateUser() {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [userTypes, setUserTypes] = useState([]);
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');

  let utilsClient = new UtilsClient();
  let usersClient = new UsersClient();

  const openModal = () => {setIsOpen(true)};
  const closeModal = () => {setIsOpen(false)};


  useEffect(() => { 
    getUserTypes();
  }, [])

  
  const getUserTypes = async() => {
    const response = await utilsClient.getUserTypes();
    setUserTypes(response);
  }

  const handleUserId = async(e) => { var value = e.target.value; setUserId(value);}
  const handleFirstName = async(e) => { var value = e.target.value; setFirstName(value);}
  const handleLastName = async(e) => { var value = e.target.value; setLastName(value);}
  const handleMail = async(e) => { var value = e.target.value; setMail(value);}
  const handlePhone = async(e) => { var value = e.target.value; setPhone(value);}
  const handleUserType = async(e) => { var value = e.target.value; setUserType(value);}

  const verifyInputData = () => {
    if(userId === '' || firstName === '' || lastName === '' || mail === '' || phone === ''){
      toast.error('Debe llenar todos los espacios ...')
    } else {
      if(!checkMailFormat(mail) ||  !checkPhoneFormat(phone)) {
        toast.error('Formato de Correo Electrónico o Número Telefónico Incorrecto ...')
      } else {
        openModal();
      }
    }
  }

  const createUser = async() => {
    if(userType === 'option'){setUserType('operator')}
    //console.log(userId, 'ce2021labs1srl.', 'operator', firstName, lastName, mail, phone, localStorage.getItem('userId'));
    const response = await usersClient.createUser(userId, 'ce2021labs1srl.', userType, firstName, lastName, mail, phone, localStorage.getItem('userId'));
    if(response === '☑️ The user was created successfully ... ') {
        toast.success('Usuario Creado exitosamente');
        sleep(2000).then(()=>{
            closeModal();
            window.location.reload();
        })
    } else if(response === '⚠️ There is already a user with the given id ...') {
      toast.error('Ya existe un usuario con el mismo id. \n Intente de nuevo.');
      closeModal();
  }

  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Crear Nuevo Usuario </h6>
          </div>
          <p className="text-blueGray-400 text-sm ">Nota: La contraseña genera aleatoriamente, y el estado de usuario es activo.</p>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
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
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=''
                    onChange={handleUserId}
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
                    <select 
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleUserType}
                    >
                        <option value="option">Seleccione una opción</option>
                        {userTypes.map(data =>
                            <option value={data.name}>{data.description}</option>
                        )};
                        </select>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=''
                    onChange={handleFirstName}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=''
                    onChange={handleLastName}
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Información de Contacto
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  >
                    Correo Electrónico
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=''
                    onChange={handleMail}
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
                    defaultValue=''
                    onChange={handlePhone}
                  />
                </div>
              </div>

              <div className="w-full lg:w-8/12 px-4" style={{marginLeft: 'auto', paddingTop:'25px'}}>
                <button
                  type="button"
                  className="github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-darkBlue-001 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  onClick={verifyInputData}
                >
                  <i class="fas fa-plus"></i> Crear Nuevo Usuario
                </button>
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
      >
        <h2><b>Sistema de Reservación de Laboratorios</b></h2>
        <div>¿Está seguro que desea crear el usuario con las especificaciones indicada?</div>
        <form style={{marginTop:'20px'}}>
          <input />
          <button onClick={closeModal} style={{marginRight:'20px', color:'red'}}>Cancelar</button>
          <button type="button" onClick={createUser} style={{color:'green'}}>Crear Usuario</button>
        </form>
      </Modal>

    </div>
    </>
  );
}
