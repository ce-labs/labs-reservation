import { ReservationsClient } from "communication/ReservationsClient";
import { UtilsClient } from "communication/UtilsClient";
import { customStyles } from "constants/styles";
import React, { createRef, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CreateReservation from "./CreateReservation";
import Modal from "react-modal";
import CreateBlockade from "./CreateBlockade";
import CustomCalendar from "./CustomCalendar";

export default function Reservations({ color }) {
  const [userData, setUserData] = useState([]);
  const [semester, setSemester] = useState([]);
  const [labs, setLabs] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");

  const [reservations, setReservations] = useState([]);
  const [finalReservations, setFinalReservations] = useState([]);
  const [finalBlockades, setFinalBlockades] = useState([]);
  const [blockades, setBlockades] = useState([]);

  const [createReservationIsOpen, setCreateReservationIsOpen] = useState(false);
  const [createBlockadeIsOpen, setCreateBlockadeIsOpen] = useState(false);

  let utilsClient = new UtilsClient();
  let reservationsClient = new ReservationsClient();

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

  const getLabsList = async () => {
    const response = await utilsClient.getLabs();
    setLabs(response);
  };

  const getUserData = async () => {
    const unparsedUserData = await localStorage.getItem("userData");
    let userData = JSON.parse(unparsedUserData);
    setUserData(userData);

    const unparsedSemesterData = await localStorage.getItem("currentSemester");
    let currentSemester = JSON.parse(unparsedSemesterData);
    setSemester(currentSemester);
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

  useEffect(() => {
    getUserData();
    getLabsList();
    setWeeksList();
  }, []);

  const searchReservations = async () => {
    if (
      category === "option" ||
      category === "" ||
      filter === "option" ||
      filter === ""
    ) {
      toast.error("Debe especificar el laboratorio y semana");
    } else {
      //console.log("buscar reservaciones y bloqueos");
      const reservationsResponse =
        await reservationsClient.getCalendarReservations(
          semester.year,
          semester.semester,
          category,
          filter
        );
      // console.log(
      //   "🚀 ~ file: Reservations.js ~ line 90 ~ searchReservations ~ reservationsResponse",
      //   reservationsResponse
      // );

      if (reservationsResponse.length === 0 || reservationsResponse === []) {
        toast.error(
          "No se encontraron reservaciones en el periodo seleccionado"
        );
        trimReservationsFormat([]);
        setReservations([]);
      } else {
        toast.success("Mostrando reservaciones en el periodo seleccionado");
        
        setReservations(reservationsResponse);

      }
      const blockadesResponse = await reservationsClient.getCalendarBlockades(
        semester.year,
        semester.semester,
        filter
      );
      console.log("🚀 ~ file: Reservations.js:125 ~ searchReservations ~ blockadesResponse:", blockadesResponse)
      if (blockadesResponse.length === 0 || blockadesResponse === []) {
        console.log(
          "No se encontraron reservaciones en el periodo seleccionado"
        );
        trimBlockadesFormat([]);
        setBlockades([]);
      } else {
        setBlockades(blockadesResponse);
      }
      trimBlockadesFormat(blockadesResponse);
      trimReservationsFormat(reservationsResponse);

      /*if (blockadesResponse.length === 0 || blockadesResponse === []) {
        toast.error(
          "No se encontraron bloqueos en el periodo seleccionado"
        );
      } else {
        //setReservations(reservationsResponse);
        setBlockades(blockadesResponse);
      }*/
    }
  };

  const setDayByNumber = (day) => {
    switch (day) {
      case 'LUNES':
        return (1).toString();
      case 'MARTES':
        return (2).toString();
      case 'MIÉRCOLES':
        return (3).toString();
      case 'JUEVES':
        return (4).toString();
      case 'VIERNES':
        return (5).toString();
      case 'SÁBADO':
        return (6).toString();
      default:
        break;
    }
  }

  const trimReservationsFormat = (reservations) => {
    //{startTime: "09:30", endTime: "11:45", dayOfWeek: "0", title: "adasd"},
    let currentReservations = [];
    for (let index = 0; index < reservations.length; index++) {
      // console.log('startTime', reservations[index].scheduleSection.slice(1, reservations[index].scheduleSection.length - 6))
      // console.log('endTime', reservations[index].scheduleSection.slice( reservations[index].scheduleSection.length - 5))
      let dayOfWeek = setDayByNumber(reservations[index].day);
      let currentElement = {startTime: reservations[index].scheduleSection.slice(0, reservations[index].scheduleSection.length - 6), 
                            endTime: reservations[index].scheduleSection.slice( reservations[index].scheduleSection.length - 5),
                            dayOfWeek: dayOfWeek,
                            title: reservations[index].description, 
                            type: reservations[index].type,
                            colorType: '#820000',
                            manager: reservations[index].manager}
      currentReservations.push(currentElement);
    }
    setFinalReservations(currentReservations);
  }

  const trimBlockadesFormat = (blockades) => {
    //{startTime: "09:30", endTime: "11:45", dayOfWeek: "0", title: "adasd"},
    console.log(blockades)
    let currentBlockades = [];
    for (let index = 0; index < blockades.length; index++) {
      let dayOfWeek = setDayByNumber(blockades[index].day);
      let currentElement = {startTime: blockades[index].scheduleSection.slice(0, blockades[index].scheduleSection.length - 6), 
                            endTime: blockades[index].scheduleSection.slice( blockades[index].scheduleSection.length - 5),
                            dayOfWeek: dayOfWeek,
                            title: blockades[index].description, 
                            type: blockades[index].type,
                            colorType: '#20262E',
                            manager: blockades[index].manager}
                            currentBlockades.push(currentElement);
    }
    setFinalBlockades(currentBlockades);
  }

  const setCreateBlockadeButton = () => {
    if (userData.userType !== "admin") {
      return <></>;
    } else {
      return (
        <>
          <button
            className="bg-primary text-white active:bg-primary-light text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={openBlockadeModal}
          >
            <i className="fas fa-plus"></i> Crear Bloqueo
          </button>
        </>
      );
    }
  };

  return (
    <>
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
              className="bg-primary text-white active:bg-primary-light  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
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
                ></h3>
              </div>
              <button
                className="bg-primary text-white active:bg-primary-light text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={openReservationModal}
              >
                <i className="fas fa-plus"></i> Crear Reservación
              </button>
              {setCreateBlockadeButton()}
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            {/*{blockades.map((data) => (
              <p>
                {data.type} {data.day} {data.scheduleSection} {data.description}
              </p>
            ))}
            {reservations.map((data) => (
              <p>
                {data.type} {data.day} {data.date}
                {data.scheduleSection} {data.description} {data.semester}{" "}
                {data.year} {data.week}
                {data.laboratory}
              </p>
            ))}
            {console.log(finalReservations)}*/}

            <CustomCalendar reservations={finalReservations} blockades={finalBlockades}/>
            
                      {/*{[
                       {startTime: "09:30", endTime: "11:45", dayOfWeek: "0", title: "adasd"}, 
                       {startTime: "09:30", endTime: "11:45", dayOfWeek: "1", title: "ASDASDASD"},
                       {startTime: "09:30", endTime: "13:45", dayOfWeek: "2", title: "ASDASDASD"}]}/>*/}
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
