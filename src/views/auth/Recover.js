import { AuthClient } from "communication/AuthClient";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { sleep } from "utils/Sleep";

export default function Recover() {
  const [userId, setUserId] = useState("");
  const [mail, setMail] = useState("");

  let history = useHistory();
  let authClient = new AuthClient();

  const handleChangeForUserId = async (e) => {
    var value = e.target.value;
    setUserId(value);
  };

  const handleChangeForMail = async (e) => {
    var value = e.target.value;
    setMail(value);
  };

  const getRecoveryCode = async () => {
    if (userId === "" || mail === "") {
      toast.error("Todos los espacios son requeridos");
    } else {
      const response = await authClient.getRecoveryCode(userId, mail);
      localStorage.setItem("toRecoverId", userId);

      switch (response) {
        case "⚠️ Incorrect userId":
          toast.error("Usuario o correo incorrectos");
          break;
        case "⚠️ Incorrect mail":
          toast.error(
            "El correo ingresado no coincide con el nombre de usuario brindado"
          );
          break;
        case "☑️ The recovery code was modified successfully ... ":
          toast.success(
            "El código de recuperación de 4 digitos fue enviado a su correo"
          );
          sleep(1500).then(() => {
            history.push("/auth/recover/verify");
          });
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <Toaster />
      <div className="container mx-auto h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div
                  className="text-black-2 text-center mb-3 font-bold"
                  style={{ paddingTop: "35px" }}
                >
                  <h1
                    className="text-blueGray-600"
                    style={{ paddingBottom: "35px" }}
                  >
                    Recuperación de Contraseña
                  </h1>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Nombre de Usuario
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Ingrese su carné"
                      onChange={handleChangeForUserId}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-mail"
                    >
                      Correo Electrónico
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="mail@mail.com"
                      onChange={handleChangeForMail}
                    />
                  </div>
                  <div
                    className="text-center mt-6"
                    style={{ paddingBottom: "35px" }}
                  >
                    <button
                      className="bg-primary text-white active:bg-primary-light  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={getRecoveryCode}
                    >
                      Obtener Código de Verificación
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
