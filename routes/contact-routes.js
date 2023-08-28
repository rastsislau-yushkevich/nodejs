const express = require('express');
const createPath = require('../helpers/create-path')
const Contact = require('../models/contact');

const router = express.Router();

router.get('/contacts', (req, res) => {
    const title = 'Contacts'
    Contact
        .find()
        .then((contacts) => res.render(createPath('contacts'), {contacts, title}))
        .catch((err) => {
            console.log(err);
            res.redirect('error')
        })
})

module.exports = router;