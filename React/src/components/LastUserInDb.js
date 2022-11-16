import React from 'react';
import imagenFondo from '../assets/images/default-user.png';
import imagenUser from '../assets/images/aluna.png';
import { useState, useEffect } from "react"


function LastUserInDb(){
    const [users, setUsers] = useState({name:"", lastName:"", email:"", avatar:"", isAdmin: false})


    useEffect(() => {
        fetch('http://localhost:3420/api/v1/users')
        .then(res => res.json())
        .then(data =>{
                let lista = data.users
               
                setUsers(lista.findLast((item)=>{ return item}))
            })
            .catch(error => console.log(error))
    }, [])
    
    console.log("usuario")
    console.log(users)

    let imagen = imagenFondo;
    if (users.avatar){imagen = imagenUser};
    let cuenta = "Estandar";
    if (users.isAdmin){cuenta = "Admin"};
    return(
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Ultimo Usuario agregado</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <h1> {users.name}</h1>
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={imagen}  alt=" Imagen Ultimo Usuario"/>
                    </div>
                    <p> Nombre: {users.name}</p>
                    <p> Apellido: {users.lastName}</p>
                    <p> Email: {users.email}</p>
                    <p> Tipo de cuenta: {cuenta}</p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">Detalle del Usuario</a>
                </div>
            </div>
        </div>
    )
}

export default LastUserInDb;
 