import React, { useEffect, useState } from 'react';
import 'resize-observer-polyfill/dist/ResizeObserver.global';
import { TimeGridScheduler, classes } from '@remotelock/react-week-scheduler';
import '@remotelock/react-week-scheduler/index.css';
import '../../assets/styles/scheduler.css';
import { UtilsClient } from '../../clients/UtilsClient';
import toast, { Toaster } from 'react-hot-toast';
import { ReservationsClient } from '../../clients/ReservationsClient';

export default function CardCalendar() {
  const [schedule, setSchedule] = useState([]);
  const [labs, setLabs] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('2021-01-04');


  const handleInputChangeForFilter = async(e) => { var value = e.target.value; setFilter(value); }
  const handleInputChangeForCategory = async(e) => { var value = e.target.value; setCategory(value); }

  let utilsClient = new UtilsClient();
  let reservationsClient = new ReservationsClient();

  useEffect(() => {
    getLabsList();
    setWeeksList();
  }, [])

  const getLabsList = async() => {
    const response = await utilsClient.getLabs();
    setLabs(response);
  }

  const setWeeksList = () => {
    var list = [];
    var k = 1;
    while(k < 19){
      list.push(k);
      k++;
    }
    setWeeks(list);
  }

  const searchReservations = async() => {
    if(category === 'option' || category === '' || filter === 'option' || filter === ''){
      toast.error('Debe especificar el laboratorio y una semana')
    } else{
      const currentStartDate = await utilsClient.getCurrentSemester();
      setStartDate(currentStartDate[0][category])
     
      const reservationsResponse = await reservationsClient.getCalendarReservations(localStorage.getItem('currentSemester-Year'), localStorage.getItem('currentSemester-Semester'), category, filter) 
      if(reservationsResponse.length === 0){
        toast.error('No se encontraron reservaciones en el periodo seleccionado');
      } else {
        var datesRange = [];
        for(var k in reservationsResponse){
          datesRange.push([reservationsResponse[k].startDate, reservationsResponse[k].endingDate, reservationsResponse[k].description])
        }
        console.log(datesRange);


        setSchedule(datesRange);
      }
    }
  } 

  return (
    <>
        <Toaster />
        <div className="flex flex-wrap">
            <div className="w-full lg:w-3/12 " >
                <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    >
                      Laboratorio
                    </label>
                    <select 
                        name="category" id="category"        
                        onChange={handleInputChangeForFilter}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    >
                        <option value="option">Seleccione una opción</option>
                        {labs.map(data =>
                            <option value={data.name}>{data.name}</option>
                        )};
                    </select>
                </div>
            </div>
            <div className="w-full lg:w-3/12 " style={{paddingLeft:'20px'}}>
                <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    >
                      Semana
                    </label>
                    <select 
                        name="category" id="category"        
                        onChange={handleInputChangeForCategory}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    >
                        <option value="option">Seleccione una opción</option>
                        {weeks.map(data =>
                            <option value={data}>{data}</option>
                        )};
                    </select>
                </div>
            </div>
            <div className="w-full lg:w-3/12" style={{paddingLeft:'20px'}}>
            <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-100 text-xs font-bold mb-2"
                 >
                  .
                </label>
                <button 
                  className="border-0 px-3 py-3 placeholder-blueGray-300 bg-darkBlue-001 text-white active:bg-lightBlue-600  rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                  type="button"
                  onClick={searchReservations}
                >
                  <i class="fas fa-search"></i> Buscar Reservaciones
                </button>
              </div>
            </div>
        <div  className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ">

        <div className="block w-full overflow-x-auto">

        <div
          style={{
            width: "100%",
            height: "700px",
            "--cell-height": "20px",
            "--cell-width": "50px",
            "--color-event-hover-background": "#ff0000"
          }}
        >
          <TimeGridScheduler
            classes={classes}
            style={{ width: "100%", height: "100%" }}
            originDate={startDate}
            
            schedule={schedule}
                        
            //onChange={setSchedule}
            visualGridVerticalPrecision={45}
            verticalPrecision={15}
            cellClickPrecision={60}

            disabled={true}
            //hiddenDays={0}
            
          />
        </div>
        </div>
        </div>
        </div>
    </>

   
  );
}
