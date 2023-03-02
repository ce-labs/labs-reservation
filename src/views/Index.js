/*eslint-disable*/
import React from "react";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Index() {
  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen bg-white">
        {/* <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h1 className="font-semibold text-2xl text-blueGray-600">Sistema de Reservación de Laboratorios.</h1>
              <h3 className="font-semibold text-2xl text-blueGray-600">
                Área Académica de Ingeniería en Computadores.
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                El Sistema de Reservación de Laboratorios es una herramienta que
                tiene como propósito principal la consulta y reserva sobre
                disponibilidad de los laboratorios del Área Académica de
                Ingeniería en Computadores. Está destinada para que operadores,
                profesores y personal administrativo realicen la gestión de
                reservaciones desde su computadora.
              </p>
              <div className="mt-12">
                <a
                  href="/auth"
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-primary active:bg-primary-light uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
                </a>
              </div>
            </div>
          </div>
        </div> */}

        <div className="container mx-auto px-6 pb-42">
          <div className="items-center flex flex-wrap">
            <div className="w-full md:w-5/12 ml-auto px-12 md:px-4">
              <div className="md:pr-12">
                <h3 className="text-3xl font-semibold ">
                  Sistema de Reservación de Laboratorios.
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  El Sistema de Reservación de Laboratorios es una herramienta
                  que tiene como propósito principal la consulta y reserva sobre
                  disponibilidad de los laboratorios del Área Académica de
                  Ingeniería en Computadores. Está destinada para que
                  operadores, profesores y personal administrativo realicen la
                  gestión de reservaciones desde su computadora.
                </p>
              </div>
            </div>

            <div className="w-full md:w-4/12 mr-auto px-4 pt-20 md:pt-0">
              <img
                alt="..."
                className="max-w-full rounded-lg shadow-xl"
                style={{
                  transform:
                    "scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)",
                }}
                src={require("assets/img/lab-default.jpg").default}
              />
            </div>
          </div>
        </div>

        {/* <img
          className="b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
          src={require("assets/img/pattern_react.png").default}
          alt="..."
      />  */}
      </section>

      <Footer />
    </>
  );
}
