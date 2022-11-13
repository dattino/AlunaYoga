import React from 'react';
import ProductsChartRow from './ProdcutsChartRow';

fetch('http://localhost:3420/api/v1/products')
.then(response => response.json())
.then(data => {
  console.log(data);
  // todos los productos
  let dataProducts = data.allProducts;
});

 let products =[
    {name: "Ropa", finalPrice: 1000, discount: 10, stock: 100, logicDelete:"NO" }
 ]


function ProductsChart (){
    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Descuento</th>
                                <th>Stock</th>
                                <th>Borrado</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Descuento</th>
                                <th>Stock</th>
                                <th>Borrado</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {
                            products.map( ( row , i) => {
                                return <ProductsChartRow { ...row} key={i}/>
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default ProductsChart;