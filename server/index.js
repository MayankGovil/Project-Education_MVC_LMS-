require('./src/app.js');

require('dotenv').config();

const express = require('express');

const app=express();

const cors = require('cors');
const allRoutes = require('./src/app.js');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(allRoutes);



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/Sliders',express.static(path.join(__dirname,'Sliders')))

app.use('/teams', express.static(path.join(__dirname, 'teams')));

const port = process.env.PORT;


app.listen(port,()=>{

    console.log(`server is running on port ${port}`);

});