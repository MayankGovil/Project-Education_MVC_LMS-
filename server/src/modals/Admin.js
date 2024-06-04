const mongoose = require('mongoose');
require('../../db/config');

const adminData = new mongoose.Schema({

    user:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const Admin = mongoose.model("admins",adminData);

module.exports=Admin;