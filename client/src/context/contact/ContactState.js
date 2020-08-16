import React , { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_CONTACT,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts : [
            {
                id : 1,
                name : 'Sanket Landage',
                email : 'sl@gmail.com',
                phone : '800-800-800',
                type : 'personal'
            },
            {
                id : 2,
                name : 'Sanket ',
                email : 'slandage@gmail.com',
                phone : '800-800-900',
                type : 'personal'
            },
            {
                id : 3,
                name : ' Landage',
                email : 'sanketl@gmail.com',
                phone : '800-800-805',
                type : 'professional'
            }
        ],
        current : null, //// (for Edit )
        filtered : null ///filter contact
    };

    const [state , dispatch] = useReducer(contactReducer , initialState);

    //All the actions add ,delete , updatae ,etc
    ///ADD Contact
    const addContact = contact =>{
        contact.id = uuidv4();
        dispatch({type : ADD_CONTACT , payload: contact});
    }
    ////Delete Contact
    const deleteContact = id => {
        dispatch({type : DELETE_CONTACT , payload: id });
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

    const updateContact = contact =>{
        dispatch({type: UPDATE_CONTACT , payload : contact });
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
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter
            }}
            >

            {props.children}
        </ContactContext.Provider>
    )
};
export default ContactState;