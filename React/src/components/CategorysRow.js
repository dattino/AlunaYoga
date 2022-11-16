import React from 'react';


function ChartRow(categoria, producto){

    return (
        <div className="col-lg-6 mb-4">
        <div className="card bg-dark text-white shadow">
          <div className="card-body">{categoria.nombre} </div>
          <p> Productos Totales: {producto.total}</p>
        </div>
      </div>
     
            )
    }
    
        

export default ChartRow;