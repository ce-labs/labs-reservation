/*eslint-disable*/
import React from "react";

import IndexNavbar from "components/Navbars/IndexNavbar.js";


export default function Index() {
  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto px-4 pb-32 pt-48">
          <div className="items-center flex flex-wrap">
            <div className="w-full md:w-5/12 ml-auto px-12 md:px-4">
              <div className="md:pr-12">
                <h4 className="text-2xl font-semibold ">
                  Sistema de Reservación de Laboratorios - Área Académica de
                  Ingeniería en Computadores.
                </h4>
                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  El Sistema de Reservación de Laboratorios es una herramienta
                  que tiene como propósito principal la consulta y reserva sobre
                  disponibilidad de los laboratorios del Área Académica de
                  Ingeniería en Computadores.
                </p>
                <div className="mt-12 flex flex-wrap ">
                  <a
                    href="/auth"
                    className="get-started text-white font-bold px-6 py-4 rounded mr-1 mb-1 bg-primary active:bg-primary-light uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  >
                    <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
                  </a>
                  <a
                    href="mailto:laboratorioscefk@gmail.com"
                    className="github-star ml-1 text-white font-bold px-6 py-4 rounded mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  >
                    <i class="fas fa-user"></i> Contacto
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full md:w-6/12 mr-auto px-4 pt-24 md:pt-0">
              <img
                alt="..."
                className="max-w-full rounded-lg shadow-xl"
                style={{
                  transform:
                    "scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)",
                }}
                src="https://images.unsplash.com/photo-1629904853716-f0bc54eea481?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
