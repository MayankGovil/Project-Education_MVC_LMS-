const mongoose = require('mongoose');
require('dotenv').config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}.f3yzdsd.mongodb.net/your_database_name_here?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`;

mongoose.connect(url)
.then(()=>{
    console.log('Database connected');
})
.catch((err)=>{
    console.log(err)
})