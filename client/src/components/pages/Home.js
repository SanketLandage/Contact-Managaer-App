import React ,{useContext , useEffect} from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {

    const authContext = useContext(AuthContext);

    useEffect(()=>{
        authContext.loadUser();
        //eslint-disable-next-line
    } , [] );
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-12 col-sm-6">
                   <ContactForm/>
                </div>
                <div className="col-12 col-sm-6">
                <h3 className="text-center text-black-50 mt-1 mb-4"><span className="fa fa-address-book-o fa-lg"></span> Your Contacts</h3>
         
                    <ContactFilter/>
                    <Contacts/>
                </div>
            </div>
        </div>
    )
}


export default Home
