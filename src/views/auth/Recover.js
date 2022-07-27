import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { sleep } from "../../assets/utils/Sleep";
import { LoginClient } from "../../clients/LoginClient";

export default function Recover() {
  const [userId, setUserId] = useState("");
  const [mail, setMail] = useState("");

  let history = useHistory();
  let authClient = new LoginClient();

  const handleChangeForUserId = async (e) => {
    var value = e.target.value;
    setUserId(value);
  };

  const handleChangeForMail = async (e) => {
    var value = e.target.value;
    setMail(value);
  };

  const getRecoveryCode = async () => {
    const response = await authClient.getRecoveryCode(userId, mail);
    localStorage.setItem("userId", userId);

    switch (response) {
      case "⚠️ Incorrect userId or mail":
        toast.error("El usuario ingresado no se encuentra en el sistema");
        break;
      case "⚠️ Incorrect mail":
        toast.error("El correo ingresado no coincide con el usuario");
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
                    className="text-blueGray-400"
                    style={{ paddingBottom: "35px" }}
                  >
                    Recuperación de Contraseña{" "}
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
                      className="border-0 px-3 py-3 placeholder-blueGray-400 text-blueGray-600   rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="userId"
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
                      className="border-0 px-3 py-3 placeholder-blueGray-400 text-blueGray-600   rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="mail@mail.com"
                      onChange={handleChangeForMail}
                    />
                  </div>
                  <div
                    className="text-center mt-6"
                    style={{ paddingBottom: "35px" }}
                  >
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
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
