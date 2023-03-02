import React, { createRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import { sleep } from "utils/Sleep";
import toast from "react-hot-toast";
import { UsersClient } from "communication/UsersClient";
import { customStyles } from "constants/styles";
import Modal from "react-modal";
import UpdateUser from "components/Cards/Users/UpdateUser";


const UpdateUserDropdown = ({ userData }) => {
  const [deleteUserIsOpen, setDeleteUserIsOpen] = useState(false);
  const [updateUserIsOpen, setUpdateUserIsOpen] = useState(false);

  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();

  let usersClient = new UsersClient();

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const openDeleteModal = () => {
    setDeleteUserIsOpen(true);
  };
  const closeDeleteModal = () => {
    setDeleteUserIsOpen(false);
  };

  const openUpdateModal = () => {
    setUpdateUserIsOpen(true);
  };
  const closeUpdateModal = () => {
    setUpdateUserIsOpen(false);
  };

  const updateUserStatus = async () => {
    var userStatus = "";
    if (userData.userStatus === "active") {
      userStatus = "inactive";
    } else if (userData.userStatus === "inactive") {
      userStatus = "active";
    }
    await usersClient.updateUserStatus(userData.userId, userStatus);
    toast.success("Estado actualizado exitosamente");
    sleep(2000).then(() => {
      window.location.reload();
    });
  };

  const deleteUser = async () => {
    await usersClient.removeUser(userData.userId);
    toast.success("Usuario eliminado exitosamente");
    sleep(1000).then(() => {
      closeDeleteModal();
      window.location.reload();
    });
  };

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
          onClick={openDeleteModal}
        >
          <i class="fas fa-trash"></i> Eliminar
        </a>
      </div>
      <Modal
        isOpen={deleteUserIsOpen}
        onRequestClose={closeDeleteModal}
        style={customStyles}
      >
        <h2>
          <b>Sistema de Reservación de Laboratorios</b>
        </h2>
        <div>
          ¿Está seguro que desea eliminar al usuario {userData.firstName}{" "}
          {userData.lastName}?
        </div>
        <div style={{ marginTop: "20px", marginLeft: "40%" }}>
          <button
            onClick={closeDeleteModal}
            style={{
              color: "#d4443c",
              paddingRight: "15px",
            }}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={deleteUser}
            style={{ color: "#1db954" }}
          >
            Eliminar Usuario
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={updateUserIsOpen}
        onRequestClose={closeUpdateModal}
        style={customStyles}
      >
        <UpdateUser currentUser={userData.userId}/>
      </Modal>
    </>
  );
};

export default UpdateUserDropdown;
