const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// conectando ao mongodb
const dbURI = 'mongodb+srv://devraeldias:r43l2201@node-course.6t036.mongodb.net/blogs?retryWrites=true&w=majority&appName=node-course'
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))  // o servidor só é iniciado após a conexão com o banco de dados
    .catch((err) => console.log(err));  // caso ocorra um erro na conexão com o banco de dados

// registrando o motor de visualização
app.set('view engine', 'ejs');

// middleware & arquivos estáticos
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.redirect('/blogs');
})

app.get('/about', (req, res) => {
    res.render('about', {title : 'About'});
})

// rotas blogs
app.use('/blogs', blogRoutes);

//reditecionamento 

app.get('/about-us', (req, res) => {
    res.redirect('/about');
})

// 404

app.use((req, res) => {
    res.status(404).render('404', {title : '404'});
})