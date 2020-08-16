import React ,{Fragment , useContext} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

 const Navbar = ( { title , icon } ) => {

    const authContext = useContext(AuthContext);
     const {isAuthenticated , logout , user} = authContext;

    const onLogout=()=>{
         logout();
     };
    const authLinks = (
        <Fragment>
              
            <li className="nav-item ml-4 ml-4" onClick={onLogout}> 
                <span className="fa fa-sign-out ml-3 mr-3 fa-lg">Logout</span>
            </li>         
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li className="nav-item"> 
                <Link to='/login' className="nav-link " >Login</Link>
            </li>
            <li className="nav-item"> 
                <Link to='/register' className="nav-link " >Register</Link>
            </li> 
            <li className="nav-item"> 
                <Link to='/about' className="nav-link " >About</Link>
            </li>       
        </Fragment>
    );

    return (
        <div>
            <nav className="navbar navbar-dark bg-primary navbar-expand-sm ">
                <div className="container">
                    <Link to='/' className="navbar-brand" ><span className={icon}></span> Contact Manager</Link>   
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                        <ul className="nav navbar-nav ml-auto">
                            {isAuthenticated ? authLinks : guestLinks}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
Navbar.propTypes = {
    title : PropTypes.string.isRequired,
    icon : PropTypes.string.isRequired,
}
Navbar.defaultProps = {
    title : "Contact Manager",
    icon : "fa fa-address-card-o  fa-lg"
}

export default Navbar;