import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { sleep } from "../../assets/utils/Sleep";

//components 

import CardTable from "../../components/Cards/Users/CardTableUsers";

export default function Users() {

  let history = useHistory();

  if(localStorage.getItem('userType') === 'operator' || localStorage.getItem('userType') === 'teachingStaff'){
    //alert('No tiene los permisos para acceder a esta sección.');
    //history.push('/app');
    toast.error('No tiene los permisos para acceder a esta sección.')
    sleep(1000).then(() => {
      history.push('/app');
    })
  }


  return (
    <>
    <Toaster/>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4" style={{paddingTop:'120px', paddingLeft:'50px', paddingRight:'50px'}}>
          <CardTable/>
        </div>
      </div>
    </>
  );
}
