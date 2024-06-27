/*eslint-disable*/
import React from "react";
import { Link, useHistory } from "react-router-dom";
// components

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  let history = useHistory();
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-slate-600 drop-shadow-md">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              Laboratorios CE
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <button
                  className="text-slate-800 bg-slate-100 active:bg-slate-200 text-xs font-bold uppercase px-4 py-2 rounded-xl drop-shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                  <a href="/auth">
                    <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
                  </a>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
