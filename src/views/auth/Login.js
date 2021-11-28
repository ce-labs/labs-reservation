import React, { useState } from "react";
import { LoginClient } from "../../clients/LoginClient";
import { UsersClient } from "../../clients/UsersClient";
import {toast, Toaster} from 'react-hot-toast';
import { useHistory } from "react-router-dom";
import { sleep } from "../../assets/utils/Sleep";
import { UtilsClient } from "../../clients/UtilsClient";


export default function Login() {

    let history = useHistory();

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    let loginClient = new LoginClient(); 
    let usersClient = new UsersClient(); 
    let utilsClient = new UtilsClient();

    const handleInputChangeForUserId = async(e) => {
        var value = e.target.value;
        setUserId(value);
    }

    const handleInputChangeForPassword = async(e) => {
        var value = e.target.value;
        setPassword(value);
    }

    const verifyUser = async() => {
        if(userId === '' || password === ''){ 
            toast.error('Debe llenar todos los espacios.')
        } else {
            const clientResponse = await loginClient.verifyUser(userId, password);
            switch (clientResponse) {
                case '⚠️ There are no users with the specified specifications ... \n[Error]: Incorrect userId':
                    toast.error('Usuario o contraseña incorrectos.');
                    break;
                case '⚠️ There are no users with the specified specifications ... \n[Error]: Incorrect userId or password':
                    toast.error('Contraseña incorrecta.');
                    break;
                case 'OK':
                    const userType = await usersClient.getUserType(userId);
                    localStorage.setItem('userType', userType);
                    const currentSemesterData = await utilsClient.getCurrentSemester();
                    localStorage.setItem('currentSemester-Year', currentSemesterData[0].year);
                    localStorage.setItem('currentSemester-Semester', currentSemesterData[0].semester);
                    localStorage.setItem('currentSemester-Week', currentSemesterData[0].week);
                    const userStatus = await usersClient.getUserStatus(userId);
                    localStorage.setItem('userStatus', userStatus);
                    if(userStatus === 'inactive') {
                        toast.error('Su estado de usuario es inactvo \n Favor contactar al correo: celabscr@gmail.com');
                        sleep(2500).then(()=>{
                            history.push('/auth');
                          })   
                    } else if(userStatus === 'active') {
                        toast.success('Bienvenido: ' + userId);
                        localStorage.setItem('userData', {"userId":userId, "password":password});
                        localStorage.setItem('userId', userId);
                        localStorage.setItem('activeSession', true);
                        sleep(1500).then(()=>{
                            history.push('/app');
                          })  
                    }
                    break;
                default:
                    break;
            }
        }
    }

    if(localStorage.getItem('activeSession')){
        history.push('/app');
    }

    return (
        <>
        <div><Toaster/></div>
        <div className="container mx-auto h-full" >
            <div className="flex content-center items-center justify-center h-full" style={{paddingTop:'20px'}}> 
            <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0" >
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-blueGray-400 text-center mb-3 font-bold" style={{paddingTop:'20px'}}>
                    <h1 className="text-blueGray-600" style={{paddingBottom:'35px'}}>Inicio de Sesión </h1>
                    </div>
                    <form>
                    <div className="relative w-full mb-3">
                        <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                        >
                        Nombre de Usuario
                        </label>
                        <input
                        type="string"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="20XXXXXXXX"
                        onChange={handleInputChangeForUserId}
                        />
                    </div>

                    <div className="relative w-full mb-3"  style={{paddingBottom:'35px'}}>
                        <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                        >
                        Contraseña
                        </label>
                        <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="password"
                        onChange={handleInputChangeForPassword}
                        />
                    </div>
                    <div className="text-center mt-6"  style={{paddingBottom:'35px'}}>
                        <button
                        className="bg-darkBlue-001 text-white active:bg-lightBlue-600  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={verifyUser}
                        >
                        Iniciar Sesión
                        </button>
                    </div>
                    </form>
                </div>
                </div>
                <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  {/*<small>¿Olvidó su contraseña?</small>*/}
                </a>
              </div>
              <div className="w-1/2 text-right">
                <a className="text-blueGray-200"
                    onClick={(e) => e.preventDefault()}>
                  <small>Recuperar contraseña</small>
                </a>
              </div>
            </div>
            </div>
            </div>
        </div>
        </>
    );
}
