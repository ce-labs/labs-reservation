import React from "react";

// components
import CardReservationsList from "../../../components/Cards/Reservations/CardReservationsList";

export default function ReservationsList() {
  return (
    <>
      <div className="flex flex-wrap mt-4" > 
        <div className="w-full mb-12 px-4" style={{paddingTop:'120px', paddingLeft:'50px', paddingRight:'50px'}}>
          <CardReservationsList />
        </div>
      </div>
    </>
  );
}
