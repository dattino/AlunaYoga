import React from 'react';


function ChartRow(props){
    return (
                <tr>
                    <td>{props.name}</td>
                    <td>{props.id}</td>
                    <td>{props.category_id}</td>
                    <td>{props.finalPrice}</td>
                    <td>{props.discount}</td>
                    <td>{props.stock}</td>
                </tr>
            )
    }
    
        

export default ChartRow;