import React, { useState } from 'react';
import 'resize-observer-polyfill/dist/ResizeObserver.global';
import { TimeGridScheduler, classes } from '@remotelock/react-week-scheduler';
import '@remotelock/react-week-scheduler/index.css';
import '../../assets/styles/scheduler.css';

const rangeStrings = [
  ['2019-03-05 09:00', '2019-03-05 11:30', 'asdsadasd'],
  ['2019-03-07 01:30', '2019-03-07 03:00'],
  ['2019-03-07 05:30', '2019-03-07 10:00'],
  ['2019-03-08 12:30', '2019-03-08 01:30'],
];

const defaultSchedule = rangeStrings.map(range =>
  range.map(dateString => new Date(dateString)),
);

export default function CardCalendar() {
  const [schedule, setSchedule] = useState(defaultSchedule);

  return (
    <>
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
                        onChange='{handleInputChangeForCategory}'
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    >
                        <option value="option">Seleccione una opción</option>
                        <option value="laboratory">Laboratorio</option>
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
                        onChange='{handleInputChangeForCategory}'
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    >
                        <option value="option">Seleccione una opción</option>
                        <option value="laboratory">Laboratorio</option>
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
                >
                    <button type="button" onClick='{searchBlockades}'>
                        <i class="fas fa-search"></i> Buscar Reservaciones
                    </button>
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
            originDate={new Date("2019-03-04")}
            schedule={schedule}
                        
            onChange={setSchedule}
            visualGridVerticalPrecision={45}
            verticalPrecision={15}
            cellClickPrecision={60}

            disabled={false}
            
          />
        </div>
        </div>
        </div>
        </div>
    </>

   
  );
}
