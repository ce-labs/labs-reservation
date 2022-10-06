import { AuthClient } from "communication/AuthClient";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { sleep } from "utils/Sleep";

export default function VerifyCode() {
  const [recoveryCode, setRecoveryCode] = useState("");

  let history = useHistory();
  let authClient = new AuthClient();

  const handleChangeForCode = async (e) => {
    var value = e.target.value;
    setRecoveryCode(value);
  };

  const verifyRecoveryCode = async () => {
    const response = await authClient.verifyRecoveryCode(
      localStorage.getItem("toRecoverId"),
      recoveryCode
    );

    switch (response) {
      case "⚠️ Incorrect code":
        toast.error(
          "El código ingresado no coincide con el enviado a su correo"
        );
        break;
      case "☑️ The code provided is correct ... ":
        toast.success("El código ingresado es el correcto");
        sleep(1500).then(() => {
          history.push("/auth/recover/update");
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
                      htmlFor="grid-mail"
                    >
                      Código de Verificación de 4 Dígitos
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="0000"
                      onChange={handleChangeForCode}
                    />
                  </div>
                  <div
                    className="text-center mt-6"
                    style={{ paddingBottom: "35px" }}
                  >
                    <button
                      className="bg-primary text-white active:bg-primary-light text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={verifyRecoveryCode}
                    >
                      Realizar Verificación
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
