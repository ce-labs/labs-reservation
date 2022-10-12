import { UsersClient } from "communication/UsersClient";
import { customStyles } from "constants/styles";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { checkPhoneFormat } from "utils/CheckFormats";
import { checkMailFormat } from "utils/CheckFormats";
import { jsonConcat } from "utils/Functions";
import { sleep } from "utils/Sleep";

export default function UpdateInfo() {
  const [userData, setUserData] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordIconShown, setPasswordIconShown] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);

  let usersClient = new UsersClient();

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
    setPasswordIconShown(!passwordIconShown);
  };

  const getUserData = async () => {
    const unparsedUserData = await localStorage.getItem("userData");
    let userData = JSON.parse(unparsedUserData);
    setUserData(userData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleInputChangeForEmail = async (e) => {
    var value = e.target.value;
    setNewEmail(value);
  };

  const handleInputChangeForPhone = async (e) => {
    var value = e.target.value;
    setNewPhone(value);
  };

  const handleInputChangeForPassword = async (e) => {
    var value = e.target.value;
    setNewPassword(value);
  };

  const verifyUserType = (userType) => {
    if (userType === "admin") {
      return "Administrador";
    } else if (userType === "teachingStaff") {
      return "Personal Administrativo";
    } else if (userType === "coordinationStaff") {
      return "Personal Asistente";
    } else if (userType === "operator") {
      return "Operador";
    }
  };

  const verifyInputData = () => {
    if (newEmail === "") {
      setNewEmail(userData.mail);
    }
    if (newPhone === "") {
      setNewPhone(userData.phone);
    }
    if (newPassword === "") {
      setNewPassword(userData.password);
    }

    if (!checkMailFormat(userData.mail) || !checkPhoneFormat(userData.phone)) {
      toast.error(
        "Formato de Correo Electrónico o Número Telefónico Incorrecto"
      );
    } else {
      openModal();
    }
  };

  const updateUser = async () => {
    const clientResponse = await usersClient.updatePersonalInformation(
      userData.userId,
      newEmail,
      newPhone,
      newPassword
    );
    switch (clientResponse) {
      case "☑️ The user was modified successfully ... ":
        const unparsedUserData = await localStorage.getItem("userData");
        let userData = JSON.parse(unparsedUserData);
        //console.log("🚀 ~ file: UpdateInfo.js ~ line 94 ~ updateUser ~ userData", userData)
        delete userData.password;
        delete userData.mail;
        delete userData.phone;
        const newData = {
          phone: newPhone,
          mail: newEmail,
          password: newPassword,
        };
        let updatedData = jsonConcat(userData, newData);
        localStorage.setItem("userData", JSON.stringify(updatedData));
        toast.success("Usuario actualizado exitosamente");

        sleep(2000).then(() => {
          closeModal();
          window.location.reload();
          //history.push('/app/profile');
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              {userData.firstName} {userData.lastName}{" "}
            </h6>
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
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
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
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Tipo de Usuario
                  </label>
                  <input
                    readOnly="true"
                    type="email"
                    className="border-0 px-3 py-3 bg-blueGray-200 rounded text-sm shadow   w-full  duration-150"
                    defaultValue={verifyUserType(userData.userType)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Estado de Usuario
                  </label>
                  <input
                    readOnly="true"
                    type="text"
                    className="border-0 px-3 py-3 bg-blueGray-200 rounded text-sm shadow   w-full  duration-150"
                    defaultValue="Activo"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
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
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
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
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
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
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Contraseña
                  </label>
                  <input
                    type={passwordShown ? "text" : "password"}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={userData.password}
                    onChange={handleInputChangeForPassword}
                  />
                </div>
              </div>

              <div
                className="w-full lg:w-6/12 px-4"
                style={{ marginTop: "3%" }}
              >
                <div className="relative w-full mb-3">
                  <label className="inline-flex items-center cursor-pointer">
                    <a onClick={togglePassword}>
                      <i
                        className={
                          passwordIconShown ? "fas fa-eye-slash" : "fas fa-eye"
                        }
                      >
                        {" "}
                      </i>
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Mostrar Contraseña
                      </span>
                    </a>
                  </label>
                </div>
              </div>

              <div
                className="text-center mt-6"
                style={{
                  paddingBottom: "35px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <button
                  className="bg-primary text-white active:bg-primary-light  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                  onClick={verifyInputData}
                >
                  <i class="fas fa-sign-in-alt"></i> Actualizar Información
                </button>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />
          </form>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2>
          <b>Sistema de Reservación de Laboratorios</b>
        </h2>
        <div>¿Está seguro que desea actualizar su información de usuario?</div>
        <div style={{ marginTop: "20px", marginLeft: "40%" }}>
          <button
            onClick={closeModal}
            style={{
              color: "#d4443c",
              paddingRight: "15px",
            }}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={updateUser}
            style={{ color: "#1db954" }}
          >
            Actualizar
          </button>
        </div>
      </Modal>
    </>
  );
}
