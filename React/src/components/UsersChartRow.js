import React from 'react';


function UsersChartRow(props){
    let ruta = '/user/detail/'+ props.id
    
    return (
                <tr>
                    <td>{props.name}</td>
                    <td>{props.id}</td>
                    <td>{props.email}</td>
                    <td>
                        <a href={ruta}>
                        <span>Ver +</span></a>
                    </td>
                </tr>
            )
    }
    
        

export default UsersChartRow;