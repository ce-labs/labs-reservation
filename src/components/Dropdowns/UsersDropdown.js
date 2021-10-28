import React, {useState} from "react";
import { createPopper } from "@popperjs/core";
import Modal from 'react-modal';
import { UsersClient } from "../../clients/UsersClient";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router";

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
  let history = useHistory();

  const [deleteUserIsOpen, setDeleteUserIsOpen] = useState(false);

  const openModal = () => {setDeleteUserIsOpen(true)};
  const closeModal = () => {setDeleteUserIsOpen(false)};

  const updateUser = () => {
      console.log(userData)
  }

  const updateUserStatus = () => {
    console.log(userData)
  }

  const deleteUser = () => {
      usersClient.removeUser(userData.userId);
      toast.success('Usuario Eliminado exitosamente');
      closeModal();
      history.push('/app/users');
  }

  return (
    <>
      <Toaster />
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
          onClick={updateUser}
        >
          <i class="fas fa-edit"></i> Modificar
        </a>
        <a
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
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
          <button onClick={deleteUser} style={{color:'green'}}>Eliminar Usuario</button>
        </form>
      </Modal>
      </div>
    </>
  );
};

export default NotificationDropdown;
