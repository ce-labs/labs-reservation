import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { ReservationsClient } from "communication/ReservationsClient";
import { UtilsClient } from "communication/UtilsClient";
import { sleep } from "utils/Sleep";

const customStyles = {
  content: {
    top: "50%",
    left: "58%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function CreateBlockade() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [labs, setLabs] = useState([]);
  const [days, setDays] = useState([]);
  const [sections, setSections] = useState([]);
  const [staff, setStaff] = useState([]);
  const [courses, setCourses] = useState([]);

  const [userMail, setUserMail] = useState("");
  const [currentLab, setCurrentLab] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [currentSection, setCurrentSection] = useState("");
  const [currentStaff, setCurrentStaff] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [showDescription, setShowDescription] = useState("");

  const [semester, setSemester] = useState([]);

  const [isChecked, setIsChecked] = useState(false);

  let utilsClient = new UtilsClient();
  let reservationsClient = new ReservationsClient();

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getUserMail();
    getLabsList();
    getDaysList();
    getSectionsList();
    getStaffList();
    getCoursesList();
  }, []);

  const getUserMail = async () => {
    const unparsedUserData = await localStorage.getItem("userData");
    let userData = JSON.parse(unparsedUserData);
    setUserMail(userData.mail);

    const unparsedSemesterData = await localStorage.getItem("currentSemester");
    let currentSemester = JSON.parse(unparsedSemesterData);
    setSemester(currentSemester);
  };

  const getLabsList = async () => {
    const response = await utilsClient.getLabs();
    setLabs(response);
  };

  const getDaysList = async () => {
    const response = await utilsClient.getScheduleDays();
    setDays(response);
  };

  const getSectionsList = async () => {
    const response = await utilsClient.getScheduleSections();
    setSections(response);
  };

  const getCoursesList = async () => {
    const response = await utilsClient.getCourses();
    setCourses(response);
  };

  const getStaffList = async () => {
    const unparsedUserData = await localStorage.getItem("userData");
    let userData = JSON.parse(unparsedUserData);
    const response = await utilsClient.getStaff();
    for (var k in response) {
      if (response[k].name === "me") {
        console.log(response[k].name);
        response[k].name = userData.lastName + " " + userData.firstName;
      }
    }
    setStaff(response);
  };

  const handleLaboratory = async (e) => {
    var value = e.target.value;
    setCurrentLab(value);
  };

  const handleScheduleDay = async (e) => {
    var value = e.target.value;
    setCurrentDay(value);
  };

  const handleScheduleData = async (e) => {
    var value = e.target.value;
    setCurrentSection(value);
  };

  const handleStaff = async (e) => {
    var value = e.target.value;
    setCurrentStaff(value);
  };

  const handleCourses = async (e) => {
    var value = e.target.value;
    setCurrentDescription(value);
  };

  const handleShowDescription = async () => {
    setIsChecked(!isChecked);
    setShowDescription(isChecked);
  };

  const verifyInputData = () => {
    if (
      currentLab === "" ||
      currentDay === "" ||
      currentSection === "" ||
      currentStaff === "" ||
      currentDescription === ""
    ) {
      toast.error("Debe llenar todos los espacios");
    } else {
      openModal();
    }
  };

  const createBlockade = async () => {
    const response = await reservationsClient.createBlockade(
      semester.year,
      semester.semester,
      currentLab,
      currentDay,
      currentSection,
      currentDescription,
      currentStaff,
      showDescription,
      localStorage.getItem("userId"),
      userMail
    );
    if (response === "☑️ The blockade was created successfully ... ") {
      toast.success("Bloqueo de Espacio Creado exitosamente");
      sleep(2000).then(() => {
        closeModal();
        window.location.reload();
      });
    } else if (response === "⚠️ There is blockade with the given id ...") {
      toast.error("Ya existe un bloqueo en ese espacio \n Intente de nuevo");
      closeModal();
    }
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Crear Bloqueo
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase"></h6>
            <div className="flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Laboratorio
                  </label>
                  <select
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleLaboratory}
                  >
                    <option value="option">Seleccione una opción</option>
                    {labs.map((data) => (
                      <option value={data.name}>{data.name}</option>
                    ))}
                    ;
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Día
                  </label>
                  <select
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleScheduleDay}
                  >
                    <option value="option">Seleccione una opción</option>
                    {days.map((data) => (
                      <option value={data.name}>{data.name}</option>
                    ))}
                    ;
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Sección de Horario
                  </label>
                  <select
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleScheduleData}
                  >
                    <option value="option">Seleccione una opción</option>
                    {sections.map((data) => (
                      <option value={data.name}>{data.name}</option>
                    ))}
                    ;
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Encargado
                  </label>
                  <select
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleStaff}
                  >
                    <option value="option">Seleccione una opción</option>
                    {staff.map((data) => (
                      <option value={data.name}>{data.name}</option>
                    ))}
                    ;
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Descripción
                  </label>
                  <select
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onChange={handleCourses}
                  >
                    <option value="option">Seleccione una opción</option>
                    {courses.map((data) => (
                      <option value={data.courseName}>{data.courseName}</option>
                    ))}
                    ;
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                    Mostrar Descripción
                  </label>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                    onChange={handleShowDescription}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div
                className="w-full lg:w-12/12 px-4 "
                style={{
                  justifyContent: "center",
                  display: "flex",
                  paddingTop: "25px",
                }}
              >
                <div className="relative w-full mb-3">
                  <button
                    type="button"
                    className="bg-primary text-white active:bg-primary-light  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    onClick={verifyInputData}
                  >
                    <i class="fas fa-plus"></i> Crear Bloqueo
                  </button>
                </div>
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
        <div>
          ¿Está seguro que desea crear el bloqueo con las especificaciones
          indicadas?
        </div>
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
            onClick={createBlockade}
            style={{ color: "#1db954" }}
          >
            Crear Bloqueo
          </button>
        </div>
      </Modal>
    </>
  );
}
