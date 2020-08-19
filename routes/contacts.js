const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Contact = require('../models/Contact');
const {check , validationResult} = require('express-validator');
const auth = require('../middleware/auth');

///@route  Get api/contacts
///@desc  Get all contact
///@access public

router.get('/', auth , async (req,res)=>{
    try {
        const contact = await Contact.find( { user : req.user.id} ).sort( { date : -1});
        res.send(contact);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error'); 
    }
});

///@route  Post api/contacts
///@desc   Add new Contact
///@access public

router.post('/', 
    [ auth ,
         [
            check('name', 'Name is Required').not().isEmpty()
        ] 
    ],
    async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }

        const { email , name , phone , type } = req.body;

        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user : req.user.id
            });

            const contact = newContact.save();
            res.json(contact);

        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
});

///@route  Post api/contacts/:id
///@desc   Add new Contact
///@access  private

router.put('/:id',auth , 
async (req,res)=>{
    const {name , email ,phone ,type } = req.body;

    ////Build contact object

    const contactField = {};

    if(name) contactField.name = name;
    if(email) contactField.email = email;
    if(phone) contactField.phone = phone;
    if(type) contactField.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(400).json({ msg : 'Contact Not Found'});

        ///Make sure User owns a contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg : 'Not authorised'});
        }

        contact = await Contact.findByIdAndUpdate(req.params.id , 
            { $set : contactField},
            {new : true}
        );

        res.json(contact);

    } catch (err) {
        console.log(err.message);
            res.status(500).send('Server Error');
    }
});

///@route  Post api/contacts/:id
///@desc   Add new Contact
///@access private

router.delete('/:id', auth , async (req,res)=>{
    try {
        let contact = await Contact.findByIdAndRemove(req.params.id);

        if(!contact) return res.status(400).json({ msg : 'Contact Not Found'});

        ///Make sure User owns a contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg : 'Not authorised'});
        }

        Contact.findByIdAndRemove(req.params.id);

        res.json({msg : 'Contact Deleted'});

    } catch (err) {
        console.log(err.message);
            res.status(500).send('Server Error');
    }
});


module.exports = router;