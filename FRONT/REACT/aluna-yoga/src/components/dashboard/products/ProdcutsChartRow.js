import React from 'react';


function ProductsChartRow(props){
    let borrado = "NO"
    if(props.logicDelete == 0){borrado = "SI" }
    return (
                <tr>
                    <td>{props.name}</td>
                    <td>{props.finalPrice}</td>
                    <td>{props.discount}</td>
                    <td>{props.discount}</td>
                    <td>
                        {borrado }
                    </td>
                </tr>
            )
    }
    
        

export default ProductsChartRow;