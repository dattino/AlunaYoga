import React from 'react';
import ChartRow from './ProductChartRow';
import { useState, useEffect, useRef} from "react"




let tableRowsData = [
    {
        name: 'Billy Elliot ',
        id: '123',
        category_id: 'Indumentaria',
        finalPrice: "1000",
        discount: 2,
        stock: 100
    },
    {
        name: 'Curso Intensivo de ser Buen Marine, por Monkey D. Garp ',
        id: '124',
        category_id: 'Clases',
        finalPrice: "1000",
        discount: 3,
        stock: 100
    }
    
]


function ProductChart (){
    const [products, setProducts] = useState(tableRowsData) 


    useEffect(() => {
        fetch('http://localhost:3420/api/v1/products')
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                setProducts ( [...data.allProducts])
               
            })
            .catch(error => console.log(error))
    }, [])
    console.log(products)
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
                            products.map( ( row , i) => {
                                return <ChartRow { ...row} key={i}/>
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