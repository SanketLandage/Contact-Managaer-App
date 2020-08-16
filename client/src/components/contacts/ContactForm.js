import React , { useState , useContext ,useEffect }from 'react';
import ContactContext from '../../context/contact/contactContext';

 const ContactForm = () => {

     const contactContext = useContext(ContactContext);
     const { addContact , current ,clearCurrent , updateContact } = contactContext;

     useEffect(()=>{
         if(current !== null){
            setContact(current);
         } else {
                setContact({
                    name : '',
                    email : '',
                    phone : '',
                    type : 'personal'
                });
            }    
     } , [contactContext , current]);


     const [contact , setContact] = useState({
        name : '',
        email : '',
        phone : '',
        type : 'personal'
     });

     const { name , email , phone, type} = contact;

    const onChange= e    => 
        setContact({...contact , [e.target.name] : e.target.value});

    const clearAll = () => {
        clearCurrent();
    }
        
    const onSubmit = e =>{
            e.preventDefault();
            if(current === null){
                addContact(contact);
            }else {
                updateContact(contact);
            }
            
        clearAll();
    };

    return (
        <div >
        <form onSubmit={onSubmit} >
            <h2 className="text-center text-primary">{(current === null) ? 'Add Contact' : 'Edit Contact'}</h2>
            <div className="form-group">
            <label for="name">Name</label>
                <input type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={onChange} 
                    className="form-control"
                    id="name"
                />
            </div>
            
            <div className="form-group">
            <label for="email">Email</label>
                <input type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onChange} 
                    id="email"
                    className="form-control"
                />
            </div>

            <div className="form-group">
             <label for="phone">Phone Number</label>
                <input type="text"
                    placeholder="Phone"
                    name="phone"
                    value={phone}
                    onChange={onChange} 
                    id="phone"
                    className="form-control"
                />
            </div>
            <h5>Contact Type</h5>
            <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange} /> Personal {' '}
            <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange} /> professional {' '}
            <div>
                <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-dark btn-block mb-4 mt-2"/>
            </div>
            {current && 
                <div>
                    <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
                </div>
            }
        </form>
        </div> 
    )
}
export default ContactForm;