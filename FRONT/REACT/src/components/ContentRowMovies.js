import React from 'react';
import SmallCard from './SmallCard';

/*  Cada set de datos es un objeto literal */

/* <!-- Movies in DB --> */

let cantProducts = {
    title: 'Candtidad de Productos',
    color: 'primary', 
    cuantity: 21,
    icon: 'fa-clipboard-list'
}

/* <!-- Total awards --> */

let totalOfertas = {
    title:' Total de Prductos en Ofertas', 
    color:'success', 
    cuantity: '10',
    icon:'fa-award'
}

/* <!-- Actors quantity --> */

let usersQuantity = {
    title:'Cantidad de Usuarios' ,
    color:'warning',
    cuantity:'49',
    icon:'fa-user-check'
}

let cartProps = [cantProducts , totalOfertas, usersQuantity];

function ContentRowMovies(){
    return (
    
        <div className="row">
            
            {cartProps.map( (movie, i) => {

                return <SmallCard {...movie} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowMovies;