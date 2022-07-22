import React, { useEffect, useState } from "react";
import { UtilsClient } from "../../clients/UtilsClient";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import { ReservationsClient } from "../../clients/ReservationsClient";
import { BlockadesClient } from "../../clients/BlockadesClient";
import CreateBlockade from "./Reservations/CreateBlockade";
import CreateReservation from "./Reservations/CreateReservation";
import { UsersClient } from "../../clients/UsersClient";

import moment from "moment";
import WeekCalendar from "react-week-calendar";

import "react-week-calendar/dist/style.css";

const customStyles = {
  content: {
    outline: "none",
    top: "50%",
    left: "58%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function CardCalendar({ color }) {
  const [reservations, setReservations] = useState([]);
  const [blockades, setBlockades] = useState([]);
  const [labs, setLabs] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");
  const [createReservationIsOpen, setCreateReservationIsOpen] = useState(false);
  const [createBlockadeIsOpen, setCreateBlockadeIsOpen] = useState(false);

  const handleInputChangeForFilter = async (e) => {
    var value = e.target.value;
    setFilter(value);
  };
  const handleInputChangeForCategory = async (e) => {
    var value = e.target.value;
    setCategory(value);
  };

  const openReservationModal = () => {
    setCreateReservationIsOpen(true);
  };
  const closeReservationModal = () => {
    setCreateReservationIsOpen(false);
  };

  const openBlockadeModal = () => {
    setCreateBlockadeIsOpen(true);
  };
  const closeBlockadeModal = () => {
    setCreateBlockadeIsOpen(false);
  };

  let utilsClient = new UtilsClient();
  let reservationsClient = new ReservationsClient();
  let blockadesClient = new BlockadesClient();
  let usersClient = new UsersClient();

  useEffect(() => {
    getLabsList();
    setWeeksList();
  }, []);

  const getLabsList = async () => {
    const response = await utilsClient.getLabs();
    setLabs(response);
  };

  const setWeeksList = () => {
    var list = [];
    var k = 1;
    while (k < 19) {
      list.push(k);
      k++;
    }
    setWeeks(list);
  };

  const searchReservations = async () => {
    if (
      category === "option" ||
      category === "" ||
      filter === "option" ||
      filter === ""
    ) {
      toast.error("Debe especificar el laboratorio y una semana");
    } else {
      const reservationsResponse =
        await reservationsClient.getCalendarReservations(
          localStorage.getItem("currentSemester-Year"),
          localStorage.getItem("currentSemester-Semester"),
          category,
          filter
        );
      if (reservationsResponse.length === 0) {
        toast.error(
          "No se encontraron reservaciones en el periodo seleccionado"
        );
        setReservations([]);
      } else {
        console.log(reservationsResponse);
        setReservations(reservationsResponse);
      }
      const blockadesResponse = await blockadesClient.getSemesterBlockades(
        localStorage.getItem("currentSemester-Year"),
        localStorage.getItem("currentSemester-Semester")
      );
      setBlockades(blockadesResponse);
    }
  };

  const setCreateBlockadeButton = () => {
    if (localStorage.getItem("userType") != "admin") {
      return <></>;
    } else {
      return (
        <>
          <button
            className="bg-darkBlue-001 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={openBlockadeModal}
          >
            <i className="fas fa-plus"></i> Crear Bloqueo
          </button>
        </>
      );
    }
  };

  /*const [selectedIntervals, setSelectedIntervals] = useState([]);

  useEffect(() => {
    const intervals = {uid:1, 
                       startTime: moment().add(4, 'm'),
                       endTime: moment().add(4, 'm'),
                      }
    setSelectedIntervals(intervals);
  }, [])*/

  return (
    <>
      <Toaster />
      <div className="flex flex-wrap">
        <div className="w-full lg:w-3/12 " style={{ paddingRight: "20px" }}>
          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
              Laboratorio
            </label>
            <select
              name="category"
              id="category"
              onChange={handleInputChangeForFilter}
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            >
              <option value="option">Seleccione una opción</option>
              {labs.map((data) => (
                <option value={data.name}>{data.name}</option>
              ))}
              ;
            </select>
          </div>
        </div>
        <div className="w-full lg:w-3/12 " style={{ paddingRight: "20px" }}>
          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
              Semana
            </label>
            <select
              name="category"
              id="category"
              onChange={handleInputChangeForCategory}
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            >
              <option value="option">Seleccione una opción</option>
              {weeks.map((data) => (
                <option value={data}>{data}</option>
              ))}
              ;
            </select>
          </div>
        </div>
        <div className="w-full lg:w-3/12" style={{ paddingRight: "20px" }}>
          <div className="relative w-full mb-3">
            <label className="block uppercase text-blueGray-100 text-xs font-bold mb-2">
              .
            </label>
            <button
              className="border-0 px-3 py-3 text-white bg-darkBlue-001 active:bg-lightBlue-600 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              type="button"
              onClick={searchReservations}
            >
              <i class="fas fa-search"></i> Buscar Reservaciones
            </button>
          </div>
        </div>

        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
            (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3
                  className={
                    "font-semibold text-lg " +
                    (color === "light" ? "text-blueGray-700" : "text-white")
                  }
                >
                  Listado de Reservaciones
                </h3>
              </div>
              <button
                className="bg-darkBlue-001 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={openReservationModal}
              >
                <i className="fas fa-plus"></i> Crear Reservación
              </button>
              {setCreateBlockadeButton()}
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            {blockades.map((data) => (
              <p>
                {data.type} {data.day} {data.scheduleSection} {data.description}
              </p>
            ))}
            {reservations.map((data) => (
              <p>
                {data.type} {data.day} {data.date}
                {data.scheduleSection} {data.description}
              </p>
            ))}

            <WeekCalendar
              fistDay={0}
              scaleFormat="HH:mm"
              startTime={moment({ h: 7, m: 30 })}
              endTime={moment({ h: 21, m: 15 })}
              scaleUnit={30}
              scaleHeaderTitle="Horario"
              cellHeight={20}
              numberOfDays={6}
              //selectedIntervals = {selectedIntervals}
              onIntervalSelect=""
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={createReservationIsOpen}
        onRequestClose={closeReservationModal}
        style={customStyles}
      >
        <CreateReservation />
      </Modal>
      <Modal
        isOpen={createBlockadeIsOpen}
        onRequestClose={closeBlockadeModal}
        style={customStyles}
      >
        <CreateBlockade />
      </Modal>
    </>
  );
}
