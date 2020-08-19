import React ,{Fragment , useContext} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

 const Navbar = ( { title , icon } ) => {

    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);
    // eslint-disable-next-line
     const {isAuthenticated , logout , user} = authContext;
     const { clearContacts } = contactContext;

    const onLogout=()=>{
         logout();
         clearContacts();
     };
    const authLinks = (
        <Fragment>
              
            <li className="nav-item ml-4 ml-4 btn" onClick={onLogout}> 
                <span className="fa fa-sign-out ml-3 mr-3 fa-lg text-white">Logout</span>
            </li>         
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li className="nav-item mr-2"> 
                <Link to='/login' className="nav-link fa fa-sign-in" > Login</Link>
            </li>
            <li className="nav-item mr-2"> 
                <Link to='/register' className="nav-link fa fa-user-plus " > Register</Link>
            </li> 
            <li className="nav-item mr-2"> 
                <Link to='/about' className="nav-link fa fa-info-circle" >About</Link>
            </li>       
        </Fragment>
    );

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark navbar-expand-sm ">
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