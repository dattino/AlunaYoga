import React from 'react';
import UsersChartRow from './UsersChartRow';
import { useState, useEffect, useRef} from "react"
 


let tableRowsData = [
    {
        name: 'Billy Elliot ',
        id: '123',
       email: 'Billy@elliot.com',

    },
    {
        name: ' Monkey D. Garp ',
        id: '124',
        email: 'TeOdioColorado@GLOBALGOVERMANT.COM',
    }
    
]


function UsersChart (){
    const [users, setUsers] = useState(tableRowsData) 


    useEffect(() => {
        fetch('http://localhost:3420/api/v1/users')
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                setUsers ( [...data.users])
               
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
                                <th>Email</th>
                              
                                
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                               
                                <th>Nombre</th>
                                <th>ID</th>
                                <th>Email</th>
                             
                            </tr>
                        </tfoot>
                        <tbody>
                            {
                            users.map( ( row , i) => {
                                return <UsersChartRow { ...row} key={i}/>
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default UsersChart;