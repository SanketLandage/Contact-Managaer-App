import React , { useReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';

import {
    ADD_CONTACT,
    GET_CONTACTS,
    CLEAR_CONTACTS,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_CONTACT,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts : null,
        current : null, //// (for Edit )
        filtered : null, ///filter contact
        error : null
    };

    const [state , dispatch] = useReducer(contactReducer , initialState);

    //All the actions add ,delete , updatae ,etc

    //get Contacts
    const getContacts = async () =>{
        try {
            const res = await axios.get('/api/contacts');

            dispatch({type : GET_CONTACTS , payload: res.data});

        } catch (err) {
            dispatch({type : CONTACT_ERROR , 
                payload : err.response.msg
            });
        }
        
    }
    ///ADD Contact
    const addContact = async contact =>{
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        };
        try {
            // eslint-disable-next-line
            const res = await axios.post('/api/contacts' , contact , config );
            dispatch({type : ADD_CONTACT , payload: contact});
        } catch (err) {
            dispatch({type : CONTACT_ERROR , 
                payload : err.response.msg
            });
        }
        
    }

    const clearContacts =()=>{
        dispatch( { type: CLEAR_CONTACTS });
    }
    ////Delete Contact
    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`);

            dispatch({type : DELETE_CONTACT , 
                payload: id 
            });
        } catch (err) {
            dispatch({type : CONTACT_ERROR , 
                payload : err.response.msg
            });
        }
        
    }
    ////Set Current (for edit)
    const setCurrent = contact =>{
        dispatch({type : SET_CURRENT , payload : contact});
    }

    const clearCurrent = () => {
        dispatch(
            { type : CLEAR_CURRENT }
        );
    }

    const updateContact = async contact =>{
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        };
        try {
            // eslint-disable-next-line
            const res = await axios.put(`/api/contacts/${contact._id}` , contact , config );

            dispatch({type: UPDATE_CONTACT ,
                 payload : contact 
            });
            
        } catch (err) {
            dispatch({type : CONTACT_ERROR , 
                payload : err.response.msg
            });
        }
        
    }

    const filterContacts = text => {
        dispatch( { type : FILTER_CONTACT , payload : text});
    }

    const clearFilter = () => {
        dispatch(
            { type : CLEAR_FILTER }
        );
    }
    return(
        <ContactContext.Provider
            value={{ 
                contacts : state.contacts,
                current : state.current,
                filtered : state.filtered,
                error : state.error,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter,
                getContacts,
                clearContacts
            }}
            >

            {props.children}
        </ContactContext.Provider>
    )
};
export default ContactState;