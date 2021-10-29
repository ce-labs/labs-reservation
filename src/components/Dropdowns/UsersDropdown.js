import React, {useState} from "react";
import { createPopper } from "@popperjs/core";
import Modal from 'react-modal';
import { UsersClient } from "../../clients/UsersClient";
import toast from "react-hot-toast";
import { useHistory } from "react-router";
import { sleep } from "../../assets/utils/Sleep";
import CardUpdateUser from "../Cards/CardUserUpdate";
import CardSettings from "../Cards/CardSettings";

const customStyles = { content: { top: '50%', left: '58%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)' }, };


const NotificationDropdown = (
    {userData}
) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  let usersClient = new UsersClient();

  const [deleteUserIsOpen, setDeleteUserIsOpen] = useState(false);
  const [updateUserIsOpen, setUpdateUserIsOpen] = useState(false);

  const openModal = () => {setDeleteUserIsOpen(true)};
  const closeModal = () => {setDeleteUserIsOpen(false)};
  
  const openUpdateModal = () => {setUpdateUserIsOpen(true)};
  const closeUpdateModal = () => {setUpdateUserIsOpen(false)};

  const updateUser = () => {
      console.log(userData)
  }

  const updateUserStatus = async() => {
    var userStatus = '';
    if(userData.userStatus === 'active') { userStatus = 'inactive' }
    else if(userData.userStatus === 'inactive') { userStatus = 'active' }
    const response = await usersClient.updateUserStatus(userData.userId, userStatus);
    toast.success('Estado de Usuario actualizado exitosamente');
    sleep(2000).then(()=>{
        window.location.reload();
    })
  }

  const deleteUser = async () => {
      const response = await usersClient.removeUser(userData.userId);
      toast.success('Usuario Eliminado exitosamente');
      //console.log(response);
      //closeModal();
      sleep(1000).then(()=>{
          closeModal();
          window.location.reload();
      })

  }

  return (
    <>
      <a
        className="text-blueGray-500 py-1 px-3"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={openUpdateModal}
        >
          <i class="fas fa-edit"></i> Modificar
        </a>
        <a
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={updateUserStatus}
        >
          <i class="fas fa-edit"></i> Actualizar Estado
        </a>
        <a
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={openModal}
        >
          <i class="fas fa-trash"></i> Eliminar
        </a>
      </div>
      <div>
      <Modal
        isOpen={deleteUserIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2><b>Sistema de Reservación de Laboratorios</b></h2>
        <div>¿Está seguro que desea eliminar al usuario {userData.firstName} {userData.lastName}?</div>
        <form style={{marginTop:'20px'}}>
          <input />
          <button onClick={closeModal} style={{marginRight:'20px', color:'red'}}>Cancelar</button>
          <a onClick={deleteUser} style={{color:'green'}}>Eliminar Usuario</a>
        </form>
      </Modal>

      <Modal
        isOpen={updateUserIsOpen}
        onRequestClose={closeUpdateModal}
        style={customStyles}
      >
        <CardSettings currentUser={userData.userId}/>
      </Modal>
      </div>
    </>
  );
};

export default NotificationDropdown;
