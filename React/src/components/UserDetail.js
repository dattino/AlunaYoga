import React from 'react';
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';



let tableRowsData = {
    id: 'Cargando ID ...',
    email: 'Cargando Email...',
    name: 'Cargando Nombre ... ',
    lastName: 'Cargando Apellido ... ',
    avatar: 'Cargando Imagen ...',
    birthdate: 'Cargando Cumpleaños ...',
    isActive: 'Cargando Activo ...',
    isAdmin: 'Cargando Admin ...',
};




function UserDetail(props) {
    let id = Number(props.match.params.id)



    const [users, setUsers] = useState(tableRowsData)


    useEffect(() => {
        fetch('http://localhost:3420/api/v1/users')
            .then(res => res.json())
            .then(data => {
                setUsers([...data.users])
            })
            .catch(error => console.log(error))
    }, [])

    if (users.length > 0) {
        let userFind = users.find(user => user.id === id);
       tableRowsData = userFind
       tableRowsData.isAdmin = tableRowsData.isAdmin? 'Sí' : 'No';
       tableRowsData.isActive = tableRowsData.isActive? 'Sí' : 'No';

    }
    let imagen= "http://localhost:3420/images/users/profileImages/" + tableRowsData.avatar
    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Cumpleaños</th>
                                <th>¿Es admin?</th>
                                <th>¿Está activo?</th>
                                <th>Nombre Imagen</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{tableRowsData.name}</td>
                                <td>{tableRowsData.lastName}</td>
                                <td>{tableRowsData.id}</td>
                                <td>{tableRowsData.email}</td>
                                <td>{tableRowsData.birthdate}</td>
                                <td>{tableRowsData.isAdmin}</td>
                                <td>{tableRowsData.isActive}</td>
                                <td><a href={imagen} target="_blank" rel="noopener noreferrer"> {tableRowsData.avatar} </a></td>
                            </tr>
                        </tbody>
                        
                    </table>
                    <Link className="nav-link" to="/usuarios">
                        <span> - Volver </span></Link>
                </div>
            </div>
        </div>

    )
}

export default UserDetail;