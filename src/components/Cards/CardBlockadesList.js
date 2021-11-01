import React, {useState, useEffect} from "react";
import toast, { Toaster } from "react-hot-toast";
import { BlockadesClient } from "../../clients/BlockadesClient";

// components

export default function CardBlockadesList() {

  const [blockades, setBlockades] = useState([]);
  const [category, setCategory] = useState('');
  const [filter, setFilter] = useState('');

  let blockadesClient = new BlockadesClient();

  useEffect(() => { 
    getBlockades();
  }, [])

  const getBlockades = async() => {
    const currentBlockades = await blockadesClient.getSemesterBlockades(localStorage.getItem('currentSemester-Year'), localStorage.getItem('currentSemester-Semester'));
    setBlockades(currentBlockades);
    console.log(currentBlockades)
  }

  const handleInputChangeForFilter = async(e) => {
    var value = e.target.value;
    setFilter(value);
  }

  const handleInputChangeForCategory = async(e) => {
      var value = e.target.value;
      setCategory(value);
  }

  const searchBlockades = async() => {
    if(category === 'option'){
      toast.error('Debe seleccionar alguna opción')
    } else{ 
      const response = await blockadesClient.searchBlockades(localStorage.getItem('currentSemester-Year'), localStorage.getItem('currentSemester-Semester'), category, filter); 
      if(response.length === 0){
        toast.error('No se encontraron resultados con las especificaciones indicadas ...');
      } else {
        toast.success('Mostrando ' + response.length + ' resultados.')
      }
      setBlockades(response);
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
                        <option value="day">Día</option>
                        <option value="description">Descripción</option>
                    </select>
                </div>
            </div>
            <div className="w-full lg:w-4/12 px-4" style={{paddingTop:'3px'}} >
                <button 
                  className="bg-darkBlue-001 text-white active:bg-lightBlue-600 text-sm font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                    <button type="button" onClick={searchBlockades}>
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
                Listado de Bloqueos
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
            <thead className="thead-light">
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Laboratorio
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Día
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Horario
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Descripción
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Profesor
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                  Tiempo de Bloqueo
                </th>
              </tr>
            </thead>
            <tbody>
            {blockades.map((item,index)=>{
              return <tr index={index}>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {item.laboratory}
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {item.day}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {item.scheduleSection}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {item.description}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {item.manager}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2">Todo el semestre</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-emerald-200">
                        <div
                          style={{ width: "100%" }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
