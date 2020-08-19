import React, { useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';


 const ContactItem = ({contact}) => {

    const contactContext = useContext(ContactContext);
    const { deleteContact ,setCurrent , clearCurrent } = contactContext;

     const { _id ,name , email , type , phone} = contact;


     const onDelete = e =>{
         deleteContact(_id);
         clearCurrent();
     }

    return (
        <div>
        <div className="card shadow-sm p-2 mb-2 bg-white rounded" >
            <h4 className="card-title text-primary text-left ml-2">
                {name}{' '} <span style={{float : 'right', marginRight:'2px'}} className={'badge ' + (type === 'personal' ? 'badge-primary' : 'badge-success')}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h4>
            <ul className="list-unstyled ml-2">
                {email && (
                    <li >
                        <i className="fa fa-envelope-o "/> {email}
                    </li>
                )}
                {phone && (
                    <li>
                        <i className="fa fa-phone "/> {phone}
                    </li>
                )}
            </ul>
            <p className="ml-2">
                <button className="btn btn-dark btn-sm" onClick={()=> setCurrent(contact)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
        </div>

        </div>
            )
}

export default ContactItem;
