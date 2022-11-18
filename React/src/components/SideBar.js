import React from 'react';
import image from '../assets/images/aluna.png';
import ContentWrapper from './ContentWrapper';

// import LastMovieInDb from './LastMovieInDb';
// import ContentRowMovies from './ContentRowCards';
import NotFound from './NotFound';
import { Link, Route, Switch } from 'react-router-dom';
// import SearchMovies from './SearchMovies';
import ProductChart from './ProductChart';
import UsersChart from './UsersChart';
import Categorys from './Categorys';
import UserDetail from './UserDetail';
import ProductDetail from './ProductDetail';

function SideBar() {
    return (
        <React.Fragment>
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon">
                        <img className="w-50" src={image} alt="Digital House" />
                    </div>
                </a>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0" />

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard - Aluna Yoga</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider" />

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">Actions</div>

                {/*<!-- Nav Item - Productos -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/productos">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Productos</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Usuarios -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/usuarios">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Usuarios</span></Link>
                </li>

                {/*<!-- Nav Item - Categorias -->*/}
                <li className="nav-item nav-link">
                    <Link className="nav-link" to="/categorias">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Categorias</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block" />
            </ul>
            {/*<!-- End of Sidebar -->*/}
            <Switch>
                <Route exact path="/">
                    <ContentWrapper />
                </Route>
                <Route exact path="/productos">
                    <ProductChart />
                </Route>
                <Route exact path="/usuarios">
                    <UsersChart />
                </Route>
                <Route path="/categorias">
                    <Categorys />
                </Route>
                <Route exact path="/user/detail/:id" component={UserDetail} >
                </Route>
                <Route exact path="/product/detail/:id" component={ProductDetail} >
                </Route>
                <Route component={NotFound} />
            </Switch>
            {/*<!-- End Microdesafio 2 -->*/}
        </React.Fragment>
    )
}
export default SideBar;