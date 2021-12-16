import React, {useState, useEffect} from "react";
import toast, { Toaster } from "react-hot-toast";
import { ReservationsClient } from "../../../clients/ReservationsClient";

// components

export default function CardReservationsList() {

  const [reservations, setReservations] = useState([]);
  const [category, setCategory] = useState('');
  const [filter, setFilter] = useState('');

  let reservationsClient = new ReservationsClient();

  useEffect(() => { 
    getReservations();
  }, [])

  const getReservations = async() => {
    const currentReservations = await reservationsClient.getSemesterReservations(localStorage.getItem('currentSemester-Year'), localStorage.getItem('currentSemester-Semester'));
    setReservations(currentReservations);
  }

  const handleInputChangeForFilter = async(e) => {
    var value = e.target.value;
    setFilter(value);
  }

  const handleInputChangeForCategory = async(e) => {
      var value = e.target.value;
      setCategory(value);
  }

  const searchReservations = async() => {
    if(category === 'option' || category === ''){
      toast.error('Debe seleccionar alguna opción')
    } if (filter === ''){
      getReservations();
    }
    else{ 
      const response = await reservationsClient.searchReservations(localStorage.getItem('currentSemester-Year'), localStorage.getItem('currentSemester-Semester'), category, filter); 
      if(response.length === 0){
        toast.error('No se encontraron resultados con las especificaciones indicadas ...');
      } else {
        toast.success('Mostrando ' + response.length + ' resultados.')
      }
      setReservations(response);
    }
  }

  const adminHeader = () => {
      if(localStorage.getItem('userType') === 'operator' || localStorage.getItem('userType') === 'teachingStaff'){
          return(
              <>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Laboratorio
                </th>
                {/*<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Fecha
                </th>*/}
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Semana
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Día
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Hora
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Encargado
                </th>
              </>
          )
      } else if(localStorage.getItem('userType') === 'admin' || localStorage.getItem('userType') === 'coordinationStaff'){
        return(
            <>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Laboratorio
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Semana
              </th>
              {/*<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Fecha
              </th>*/}
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Día
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Hora
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Descripción
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Encargado
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Creador 
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Correo
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Fecha de Creación
              </th>
            </>
        ) 
      }
  }

  const showDescriptionActions = (show, description) => {
    if(show === true) {
        return(<><h3 className="text-darkBlue-600">⚠️ Descripción no disponible</h3></>)
    } else if(show === false){
        return(<>{description}</>)
    }
  }

  const adminBody = () => {
    if(localStorage.getItem('userType') === 'operator' || localStorage.getItem('userType') === 'teachingStaff'){
        return(
            <>
             {reservations.map((item,index)=>{
                return( 
                    <tr key={index}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {item.laboratory}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {item.week}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.day}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.scheduleSection}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.manager}
                      </td>
            </tr>
             )})}
            </>
        )
    } else if(localStorage.getItem('userType') === 'admin' || localStorage.getItem('userType') === 'coordinationStaff'){
        return(
            <>
             {reservations.map((item,index)=>{
                return( 
                    <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {item.laboratory}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.week}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.day}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.scheduleSection}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {showDescriptionActions(item.showDescription, item.description)}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.manager}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className="fas fa-user text-darkBlue-600 mr-4"></i>
                        {item.creationAuthor}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className="fas fa-envelope text-darkBlue-600 mr-4"></i>
                        {item.creationAuthorMail}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className="fas fa-history text-darkBlue-600 mr-4"></i>
                        {item.creationDate}
                        </td>
                    </tr>
                )})}

            </>
        )

    }
  }

      
  return (
    <>
          <Toaster/>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-4/12 ">
                <div className="relative w-full mb-3">
                    <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleInputChangeForFilter}
                    />
                </div>
            </div>
            <div className="w-full lg:w-3/12 " style={{paddingLeft:'20px'}}>
                <div className="relative w-full mb-3">
                    <select 
                        name="category" id="category"        
                        onChange={handleInputChangeForCategory}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    >
                        <option value="option">Seleccione una opción</option>
                        <option value="laboratory">Laboratorio</option>
                        <option value="scheduleSection">Horario</option>
                        <option value="week">Semana</option>
                        {/*<option value="date">Fecha</option>*/}
                    </select>
                </div>
            </div>
            <div className="w-full lg:w-4/12 px-4" style={{paddingTop:'3px'}} >
                <button 
                  className="bg-darkBlue-001 text-white active:bg-lightBlue-600 text-sm font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                    <button type="button" onClick={searchReservations}>
                        <i class="fas fa-search"></i> Buscar Reservaciones
                    </button>
                </button>
              </div>
        </div>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Listado de Reservaciones
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <h3 className="font-semibold text-base text-blueGray-700">
                {localStorage.getItem('currentSemester-Year')} / {localStorage.getItem('currentSemester-Semester')}
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {adminHeader()}
              </tr>
            </thead>
            <tbody>
                {adminBody()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
