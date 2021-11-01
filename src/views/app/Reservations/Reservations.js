import React from "react";
import { useHistory } from "react-router";


export default function Reservations() {
  let history = useHistory();
  return (
    <>
      <button type="button" onClick={()=> {history.replace('/app/reservations/reservations')}} style={{marginTop:'150px', backgroundColor:'#000', color:'#fff'}}>lista de reservaciones</button><br/>
      <button type="button" onClick={()=> {history.replace('/app/reservations/blockades')}} style={{marginTop:'20px', backgroundColor:'#000', color:'#fff'}}>lista de bloqueos</button>
    </>
  );
}
