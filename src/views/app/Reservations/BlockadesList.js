import React from "react";

// components
import CardBlockadesList from "../../../components/Cards/Reservations/CardBlockadesList";

export default function BlockadesList() {
  return (
    <>
      <div className="flex flex-wrap mt-4" style={{paddingTop:'120px', paddingLeft:'50px', paddingRight:'50px'}}> 
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CardBlockadesList />
        </div>
      </div>
    </>
  );
}
