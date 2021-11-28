import React from "react";

// components
import CardReservationsList from "../../../components/Cards/Reservations/CardReservationsList";

export default function ReservationsList() {
  return (
    <>
      <div className="flex flex-wrap mt-4" style={{paddingTop:'150px', paddingLeft:'50px', paddingRight:'50px'}}> 
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CardReservationsList />
        </div>
      </div>
    </>
  );
}
