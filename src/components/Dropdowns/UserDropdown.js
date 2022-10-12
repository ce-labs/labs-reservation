import React, { createRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import { useHistory } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import { sleep } from "utils/Sleep";
import { customStyles } from "constants/styles";

const UserDropdown = () => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();

  let history = useHistory();

  const openLogoutModal = () => {
    setLogoutModalOpen(true);
  };
  const closeLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const logout = async() => {
    toast.success("Cerrando Sesión ...");
    localStorage.clear();

    sleep(2500).then(() => {
      history.push("/auth");
    });
  };

  return (
    <>
      <a
        className="text-blueGray-500 block"
        href=""
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-8 h-8 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={require("assets/img/user.png").default}
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href=""
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={() => history.push("/app/profile")}
        >
          Perfil
        </a>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <button
          href=""
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={openLogoutModal}
        >
          Cerrar Sesión
        </button>
      </div>
      <Modal
        isOpen={logoutModalOpen}
        onRequestClose={closeLogoutModal}
        style={customStyles}
      >
        <h2>
          <b>Sistema de Reservación de Laboratorios</b>
        </h2>
        <div>¿Está seguro que desea cerrar sesión?</div>
        <div style={{ marginTop: "20px", marginLeft: "40%" }}>
          <button
            onClick={closeLogoutModal}
            style={{
              color: "#d4443c",
              paddingRight: "15px",
            }}
          >
            Cancelar
          </button>
          <button type="button" onClick={logout} style={{ color: "#1db954" }}>
            Cerrar Sesión
          </button>
        </div>
      </Modal>
    </>
  );
};

export default UserDropdown;
