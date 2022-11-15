import React from 'react';
import SmallCard from './SmallCard';

import { useState, useEffect } from "react"

/*  Cada set de datos es un objeto literal */

let cantProducts = {
    title: 'Total de Productos',
    color: 'primary',
    cuantity: 'Cargando...',
    icon: 'fa-clipboard-list'
}

/* <!-- Total awards --> */

let totalOfertas = {
    title: ' Total de Ofertas',
    color: 'success',
    cuantity: 'Cargando...',
    icon: 'fa-award'
}

/* <!-- Actors quantity --> */

let usersQuantity = {
    title: 'Total de Usuarios',
    color: 'warning',
    cuantity: 'Cargando...',
    icon: 'fa-user-check'
}

let cartProps = [cantProducts, totalOfertas, usersQuantity];

function ContentRowCards() {
    const [products, setProducts] = useState()

    useEffect(() => {
        fetch('http://localhost:3420/api/v1/products')
            .then(res => res.json())
            .then(data => {
                setProducts(...[data.allProducts])
            })
            .catch(error => console.log(error))
    }, [])

    if (products) {
        let oferta = 0
        products.map((product, i) => {
            if (product.discount > 0) {
                oferta = oferta + 1
            }
            return totalOfertas.cuantity = oferta
        })
        cantProducts.cuantity = products.length
    }

    let user = {}
    fetch('http://localhost:3420/api/v1/users')
        .then(res => res.json())
        .then(data => {
            user = data
            usersQuantity.cuantity = user.meta.total
        })
        .catch(error => console.log(error))

    return (
        <div className="row">
            {cartProps.map((movie, i) => {
                return <SmallCard {...movie} key={i} />
            })}
        </div>
    )
}

export default ContentRowCards;