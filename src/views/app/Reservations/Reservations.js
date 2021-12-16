import React from "react";
import { useHistory } from "react-router";
import CardCalendar from "../../../components/Cards/CardCalendar";


export default function Reservations() {
  let history = useHistory();
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4" style={{paddingTop:'120px', paddingLeft:'50px', paddingRight:'50px'}}>
          <CardCalendar color={"light"}/>
            <div style={{margin:'auto'}}>
              <button
                className="bg-darkBlue-001 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={()=> {history.replace('/app/reservations/reservations')}}
              >
                <i className="fas fa-list"></i> Lista general de reservaciones
              </button>
              <button
                className="bg-darkBlue-001 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={()=> {history.replace('/app/reservations/blockades')}}
              >
                <i className="fas fa-lock"></i> Lista general de bloqueos
              </button> 
            </div> 
 
        </div>
        
      </div>
    </>
  );
}
