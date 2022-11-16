import React from 'react';
import ChartRow from './ProductChartRow';
import { useState, useEffect } from "react"




let tableRowsData = [
    {
        name: '... Cargando Nombre 1 ...',
        id: '... Cargando Nombre 1 ...',
        category_id: '... Cargando Categoria ...',
        finalPrice: "... Cargando Precio Final ...",
        discount: "... Cargando Descuento ...",
        stock: "... Cargando Stock ..."
    },
    {
        name: '... Cargando Nombre 2 ...',
        id: '... Cargando Nombre 2 ...',
        category_id: '... Cargando Categoria ...',
        finalPrice: "... Cargando Precio Final ...",
        discount: "... Cargando Descuento ...",
        stock: "... Cargando Stock ..."
    }

]


function ProductChart() {
    const [products, setProducts] = useState(tableRowsData)


    useEffect(() => {
        fetch('http://localhost:3420/api/v1/products')
            .then(res => res.json())
            .then(data => {
                setProducts([...data.allProducts])
            })
            .catch(error => console.log(error))
    }, [])
    return (

        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>

                                <th>Nombre</th>
                                <th>ID</th>
                                <th>Categoria</th>
                                <th>Precio</th>
                                <th>Descuento</th>
                                <th>Stock</th>

                            </tr>
                        </thead>
                        <tfoot>
                            <tr>

                                <th>Nombre</th>
                                <th>ID</th>
                                <th>Categoria</th>
                                <th>Precio</th>
                                <th>Descuento</th>
                                <th>Stock</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {
                                products.map((row, i) => {
                                    return <ChartRow {...row} key={i} />
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default ProductChart;