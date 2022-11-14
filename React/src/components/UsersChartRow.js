import React from 'react';


function UsersChartRow(props){
    return (
                <tr>
                    <td>{props.name}</td>
                    <td>{props.id}</td>
                    <td>{props.email}</td>
                </tr>
            )
    }
    
        

export default UsersChartRow;