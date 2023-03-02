import { AuthClient } from "communication/AuthClient";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { sleep } from "utils/Sleep";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordIconShown, setPasswordIconShown] = useState(false);

  let history = useHistory();
  let authClient = new AuthClient();

  const handleChangeForPassword = async (e) => {
    var value = e.target.value;
    setPassword(value);
  };

  const handleChangeForPasswordConfirmation = async (e) => {
    var value = e.target.value;
    setPasswordConfirmation(value);
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
    setPasswordIconShown(!passwordIconShown);
  };

  const updatePassword = async () => {
    if (password !== passwordConfirmation) {
      toast.error("Las contraseñas deben ser iguales");
    } else if (password === localStorage.getItem("toRecoverId")) {
      toast.error("La contraseña debe ser distinta al nombre de usuario");
    } else {
      toast.success("La contraseña fue actualizada exitosamente");
      await authClient.updatePassword(localStorage.getItem("toRecoverId"), password);
      sleep(1500).then(() => {
        localStorage.removeItem("toRecoverId")
        history.push("/auth/login");
      });
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
                      Contraseña
                    </label>
                    <input
                      type={passwordShown ? "text" : "password"}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Ingrese la nueva contraseña"
                      onChange={handleChangeForPassword}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-mail"
                    >
                      Confirmación de Contraseña
                    </label>
                    <input
                      type={passwordShown ? "text" : "password"}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Repita la contraseña ingresada"
                      onChange={handleChangeForPasswordConfirmation}
                    />
                  </div>
                  <div style={{ paddingBottom: "35px" }}>
                    <label className="inline-flex items-center cursor-pointer">
                      <a onClick={togglePassword}>
                        <i
                          className={
                            passwordIconShown
                              ? "fas fa-eye-slash"
                              : "fas fa-eye"
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
                  <div
                    className="text-center mt-6"
                    style={{ paddingBottom: "35px" }}
                  >
                    <button
                      className="bg-primary text-white active:bg-primary-light text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={updatePassword}
                    >
                      Actualizar Contraseña
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
