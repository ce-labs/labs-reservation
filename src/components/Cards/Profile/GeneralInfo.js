import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { sleep } from "utils/Sleep";
import Modal from "react-modal";
import { customStyles } from "constants/styles";

export default function GeneralInfo() {
  const [userData, setUserData] = useState([]);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const openLogoutModal = () => {
    setLogoutModalOpen(true);
  };
  const closeLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  let history = useHistory();

  const getUserData = async () => {
    const unparsedUserData = await localStorage.getItem("userData");
    let userData = JSON.parse(unparsedUserData);
    setUserData(userData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const logout = async () => {
    toast.success("Cerrando Sesión ...");
    localStorage.clear();

    sleep(2500).then(() => {
      history.push("/auth");
    });
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-6">
        <div className="px-6">
          <div className=" py-4 w-full  flex justify-center">
            <div className="relative">
              <img
                alt="Default Profile Picture"
                src={require("../../../assets/img/user.png").default}
                className="shadow-xl rounded-full h-auto align-middle border-none max-w-150-px"
              />
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-600 mb-2">
              {userData.firstName} {userData.lastName}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-600 ">
              <i className="fas fa-user mr-2 text-lg text-blueGray-400"></i>{" "}
              {userData.userId}
            </div>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-600  ">
              <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>{" "}
              {userData.mail}
            </div>
          </div>
          <div className=" py-6 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="mt-6">
                <button
                  className="bg-primary text-white active:bg-primary-light  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
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
}
