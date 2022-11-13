import React from 'react';
import image from '../assets/images/logo.png';


import NotFound from './NotFound';
import {Link, Route, Routes} from 'react-router-dom';

import Dashboard from './dashboard/Dashboard';
import ProductsChart from './dashboard/products/ProductsChart';

function SideBar(){
    return(
        <React.Fragment>
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon">
                        <img className="w-100" src={image} alt="Digital House"/>
                    </div>
                </a>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0"/>

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard - Aluna Yoga</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">Actions</div>

                {/*<!-- Nav Item - Productos -->*/}
                <li className="nav-item">
                <Link className="nav-link" to="/products">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Productos</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Categorias -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Categorias</span></Link>
                </li>

                {/*<!-- Nav Item - Marcas -->*/}
                <li className="nav-item nav-link">
                <Link className="nav-link" to="">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Marcas</span></Link>
                </li>

                   {/*<!-- Nav Item - Usuarios -->*/}
                   <li className="nav-item nav-link">
                <Link className="nav-link" to="">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Marcas</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>


        
            <Routes>
                <Route exact path="/">
                    <Dashboard />
                </Route>
                <Route path="/Products">
                    <ProductsChart />
                </Route>
           
                <Route component={NotFound} />
            </Routes>
          
        </React.Fragment>
    )
}
export default SideBar;