import React from "react";

// components
import CardBlockadesList from "../../../components/Cards/CardBlockadesList";

export default function BlockadesList() {
  return (
    <>
      <div className="flex flex-wrap mt-4" style={{paddingTop:'150px'}}> 
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CardBlockadesList />
        </div>
      </div>
    </>
  );
}