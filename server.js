const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path')
const postApiRoutes = require('./routes/api-post-routes');

require('dotenv').config();

const app = express();

mongoose
    .connect(process.env.DB_URL)
    .then(res => console.log('Connected'))
    .catch(err => console.log(err))

app.set('view-engine', 'ejs');

app.listen(process.env.PORT, (error) => {
    error ? console.log(error) : console.log(`Alles gut at http://localhost:${process.env.PORT}`)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.static('styles'))

app.use(express.urlencoded({extended: false}))

app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    const title = 'Home'
    res.render(createPath('index'), {title})
})

app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);

app.get('/about-us', (req, res) => {
    res.redirect('/contacts')
})

app.use((req, res) => {
    const title = 'Error'
    res
        .status(404)
        .render(createPath('error'), {title})
})