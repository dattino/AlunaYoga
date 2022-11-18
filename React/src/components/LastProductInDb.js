import React from 'react';
import imagenFondo from '../assets/images/default.jpg';
import imagenProducto from '../assets/images/1667325872513-Master Vinyasa.jpg';
import { useState, useEffect } from "react"


function LastProductInDb(){
    const [products, setProducts] = useState({name:"pepe", category:"cargando...", description: "cargando...", marcas:"cargando..." , finalPrice: "cargando...", image:"default.jpg"})


    useEffect(() => {
        fetch('http://localhost:3420/api/v1/products')
            .then(res => res.json())
            .then(data => {
                let lista = data.allProducts
                setProducts(lista.findLast((item)=>{ return item}))
            })
            .catch(error => console.log(error))
    }, [])

    let imagen = imagenFondo
    
    let imagenProducto = "http://localhost:3420/images/products/"+products.image
    if (products.image){
        imagen = imagenProducto
    }
    let ruta = '/product/detail/'+products.id ;
  
    return(
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Ultimo Producto agregado</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <h1> {products.name}</h1>
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={imagen}  alt=" Imagen Ultimo porducto "/>
                    </div>
                    <p> {products.description}</p>
                  
                    <p> Marca: {products.marcas.nombre}</p>
                    <p> $ {products.finalPrice}</p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href={ruta}>Detalle del Producto</a>
                </div>
            </div>
        </div>
    )
}

export default LastProductInDb;
