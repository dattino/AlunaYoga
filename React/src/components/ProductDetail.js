import React from 'react';
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';



let tableRowsData = {
    id: 'Cargando ID...',
    name: 'Cargando Nombre ... ',
    categorys:{
        nombre:'Cargando...'
    } ,
    marcas:{
        nombre:'Cargando...',
    } ,
    description:'Cargando...',
    stock:'Cargando...',
    price:'Cargando...',
    discount:'Cargando...',
    finalPrice:'Cargando...',
    image:'Cargando...',
    created_at:'Cargando...',
    updated_at:'Cargando...',
};

function UserDetail(props) {
    let id = Number(props.match.params.id)



    const [products, setProducts] = useState(tableRowsData)


    useEffect(() => {
        fetch('http://localhost:3420/api/v1/products')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setProducts([...data.allProducts])
            })
            .catch(error => console.log(error))
    }, [])

    if (products.length > 0) {
        let productsFind = products.find(user => user.id === id);
       tableRowsData = productsFind
    }
    let imagen= "http://localhost:3420/images/products/" + tableRowsData.image
    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Marca</th>
                                <th>Descripción</th>
                                <th>Stock</th>
                                <th>Precio</th>
                                <th>Descuento</th>
                                <th>Precio Final</th>
                                <th>Imagen</th>
                                <th>Creado día</th>
                                <th>Modificado día</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{tableRowsData.id}</td>
                                <td>{tableRowsData.name}</td>
                                <td>{tableRowsData.categorys.nombre}</td>
                                <td>{tableRowsData.marcas.nombre}</td>
                                <td>{tableRowsData.description}</td>
                                <td>{tableRowsData.stock}</td>
                                <td>{tableRowsData.price}</td>
                                <td>{tableRowsData.discount}</td>
                                <td>{tableRowsData.finalPrice}</td>
                                <td><a href={imagen} target="_blank" rel="noopener noreferrer"> {tableRowsData.image} </a></td>
                                <td>{tableRowsData.created_at}</td>
                                <td>{tableRowsData.updated_at}</td>
                            </tr>
                        </tbody>
                        
                    </table>
                    <Link className="nav-link" to="/productos">
                        <span> - Volver </span></Link>
                </div>
            </div>
        </div>

    )
}

export default UserDetail;