import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import Modal from 'react-modal';
import { UsersClient } from "../../clients/UsersClient";
import toast, { Toaster } from "react-hot-toast";

import TableDropdown from "../Dropdowns/UsersDropdown";
import CardCreateUser from "./CardCreateUser";

const customStyles = { content: { top: '50%', left: '58%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)' }, };

export default function CardTable({ color }) {

  const [currentUsers, setCurrentUsers] = useState([]);
  const [category, setCategory] = useState('');
  const [filter, setFilter] = useState('');
  const [createUserIsOpen, setCreateUserIsOpen] = useState(false);

  let usersClient = new UsersClient();
  
  useEffect(() => { 
    getAllUsers();
  }, [])

  const getAllUsers = async() => {
    const currentUsers = await usersClient.getAllUsers();
    setCurrentUsers(currentUsers);
  }

  const openModal = () => {setCreateUserIsOpen(true)};
  const closeModal = () => {setCreateUserIsOpen(false)};

  const handleInputChangeForFilter = async(e) => {
    var value = e.target.value;
    switch (value) {
      case 'Administrador':
        value = 'admin'
        break;
      case 'Personal Asistente':
        value = 'coordinationAssitant'
        break;
      case 'Personal Administrativo':
        value = 'teachingStaff'
        break;
      case 'Operador':
        value = 'operator'
        break;  
      default:
        break;
    }
    setFilter(value);
  }

  const handleInputChangeForCategory = async(e) => {
      var value = e.target.value;
      setCategory(value);
  }

  const searchUsers = async() => {
    if(category === 'option'){
      toast.error('Debe seleccionar alguna opción')
    }
    const response = await usersClient.searchUsers(category, filter)
    setCurrentUsers(response);
    toast.success('Mostrando ' + response.length + ' resultados.')
  }

  const verifyUserStatus = (userStatus) => {
    if (userStatus === 'active') {
        return(<><i className="fas fa-circle text-green-001 mr-2"></i> Activo </> )
    } else if(userStatus === 'inactive'){
        return(<><i className="fas fa-circle text-orange-500 mr-2"></i> Inactivo </> )
    }
  }

  const verifyUserType = (userType) => {
    if (userType === 'admin') {
        return('Administrador')
    } else if (userType === 'teachingStaff') {
        return('Personal Administrativo')
    } else if (userType === 'coordinationAssitant') {
        return('Personal Asistente')
    } else if (userType === 'operator') {
        return('Operador')
    }
  }
  
  return (
    <>
      <Toaster />
      <div className="flex flex-wrap">
            <div className="w-full lg:w-4/12 ">
                <div className="relative w-full mb-3">
                    <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleInputChangeForFilter}
                    />
                </div>
            </div>
            <div className="w-full lg:w-3/12 " style={{paddingLeft:'20px'}}>
                <div className="relative w-full mb-3">
                    <select 
                        name="category" id="category"        
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
            <div className="w-full lg:w-4/12 px-4" style={{paddingTop:'3px'}} >
                <button 
                  className="bg-darkBlue-001 text-white active:bg-lightBlue-600 text-sm font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                    <a onClick={searchUsers}>
                        <i class="fas fa-search"></i> Buscar Usuario (s)
                    </a>
                </button>
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
              >
                Lista de Usuarios
              </h3>
            </div>
            <button
              className="bg-darkBlue-001 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={openModal}
            >
              <i className="fas fa-plus"></i> Crear Nuevo Usuario
            </button>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table  className="items-center w-full bg-transparent border-collapse">
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
                {currentUsers.map((item,index)=>{
                return <tr key={index}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    <img
                        src={require("../../assets/img/user.png").default}
                        className="h-12 w-12 bg-white rounded-full border"
                        alt="..."
                    ></img>{" "}
                    <span
                        className={
                        "ml-3 font-bold " +
                        +(color === "light" ? "text-blueGray-600" : "text-white")
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
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                      <TableDropdown userData={{"userId": item.userId, "password":item.password, "firstName":item.firstName, "lastName":item.lastName, "userType":item.userType, "userStatus": item.userStatus, "mail": item.mail, "phone": item.phone} }/>
                    </td>
                    </tr>})}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={createUserIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <CardCreateUser/>
      </Modal>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
