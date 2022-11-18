import React from 'react';


function ChartRow(props){
    let ruta = '/product/detail/'+ props.id
    return (
                <tr>
                    <td>{props.name}</td>
                    <td>{props.id}</td>
                    <td>{props.category_id}</td>
                    <td>{props.finalPrice}</td>
                    <td>{props.discount}</td>
                    <td>{props.stock}</td>
                    <td>
                        <a href={ruta}>
                        <span>Ver +</span></a>
                    </td>
                </tr>
            )
    }
    
        

export default ChartRow;