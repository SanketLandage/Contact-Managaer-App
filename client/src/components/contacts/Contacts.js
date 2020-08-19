import React , {Fragment , useContext ,useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem'

 const Contacts = () => {
     const contactContext = useContext(ContactContext);

     const { contacts , filtered ,getContacts , loading} = contactContext;

     useEffect(()=>{
        getContacts();
        //eslint-disable-next-line
     },[]);

     if(contacts !== null && contacts.length === 0 && !loading){
         return <h4>Please Add a Contact !</h4>
     }
    
    

    return (
        
        <Fragment>
            {contacts !== null && !loading ? 
            <div>
                {filtered !== null ? 
                    filtered.map(contact => (
                        <ContactItem key={contact.id} contact={contact}/>
                    ))
                    :
                    contacts.map(contact=> (
                        <ContactItem key={contact.id} contact={contact}/>
                    ))
                }
            </div> : 
            <div className="fa-4x text-center">
             <i className="fa fa-spinner fa-spin"></i>
            </div> }
            
        </Fragment>  
        
    )
};
export default Contacts;
