import React from "react";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
    if(localStorage.getItem('activeSession')){
        toast.success('Bienvenido de nuevo' + localStorage.getItem('userData'))
    }
     
    return (
        <>
        <Toaster/>
        <h1>App</h1>
        </>
    );
}
