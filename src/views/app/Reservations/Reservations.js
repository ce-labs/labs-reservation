import React from "react";
import { useHistory } from "react-router";
import CardCalendar from "../../../components/Cards/CardCalendar";


export default function Reservations() {
  let history = useHistory();
  return (
    <>
      <button type="button" onClick={()=> {history.replace('/app/reservations/reservations')}} style={{marginTop:'150px', marginRight:'30px', backgroundColor:'#000', color:'#fff'}}>lista de reservaciones</button>
      <button type="button" onClick={()=> {history.replace('/app/reservations/blockades')}} style={{marginTop:'150px', backgroundColor:'#000', color:'#fff'}}>lista de bloqueos</button>
      <CardCalendar />
    </>
  );
}
