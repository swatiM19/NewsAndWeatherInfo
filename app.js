const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./route');


// Inti App
const app = express();

// Body-parser
app.use(bodyParser.json());

// Routes
app.use('/', routes);


mongoose.connect('mongodb://localhost:27017/weather-db', { useNewUrlParser: true }, () =>{
    console.log('connected to DBBBB!!');
});

// mongoose.connect('mongodb+srv://testuser:testpassword@cluster0.kpfbg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true }, () => {
//         console.log('connected to DBBBB!!');
//     } )

//listen to server
app.on('listening',function(){
    console.log('ok, server is running');
});
app.listen(3000);


