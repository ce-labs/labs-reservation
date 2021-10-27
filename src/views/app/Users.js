import React from "react";

//components 

import CardTable from "../../components/Cards/CardTableUsers";

export default function Users() {
  return (
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4" style={{paddingTop:'150px'}}>
          <CardTable/>
        </div>
      </div>
  );
}
