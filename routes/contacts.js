const express = require('express');
const router = express.Router();

///@route  Get api/contacts
///@desc  Get all contact
///@access public

router.get('/', (req,res)=>{
    res.send('Get all contacts');
});

///@route  Post api/contacts
///@desc   Add new Contact
///@access public

router.post('/', (req,res)=>{
    res.send('Add new contact');
});

///@route  Post api/contacts/:id
///@desc   Add new Contact
///@access public

router.put('/:id', (req,res)=>{
    res.send('Update contact');
});

///@route  Post api/contacts/:id
///@desc   Add new Contact
///@access public

router.delete('/:id', (req,res)=>{
    res.send('Delete contact');
});


module.exports = router;