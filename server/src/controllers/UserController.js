const nodemailer = require('nodemailer');
const User = require('../modals/User');
require('dotenv').config();

const setOtp = new Map();

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_APP_PASSWORD_GMAIL
    }
});



const otpGenrate = async (req, res) => {
    const userEmail = req.body.email;

    const otp = Math.floor(100000 + Math.random() * 900000);

    setOtp.set(userEmail, otp.toString());

    const options = {
        from: process.env.ADMIN_EMAIL,
        to: userEmail,
        subject: 'One Time Password for Registration',
        text: `Your OTP is ${otp}`
    };

    transporter.sendMail(options, (error, info) => {
        if (error) return res.status(202).json({ message: false });
        res.status(200).json({ message: true });

    })

};


const createUser = async (req, res) => {

    try {
        const { name, email, password, cpassword, otp } = req.body;

        const sentOtp = setOtp.get(email);

        if (sentOtp !== otp) return res.status(403).json({ message: 'Invalid OTP', okay: false })

        if (password !== cpassword) return res.status(403).json({ message: 'password and confirm password not match', okay: false });

        const data = new User({
            name,
            email,
            password,
        });

        const response = await data.save();
        const responseWithoutPassword = { ...response._doc };
        delete responseWithoutPassword.password;
        res.status(200).json({ message: 'User register successfull', okay: true, data: responseWithoutPassword });

    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error', okay: false });
    }
};


const logInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userdata = await User.find({ email: email });

        if (userdata.length === 0) 
        {
            return res.status(404).json({ status: false, messege: 'User not foound' });
        }

        if(userdata[0].password !== password)
        {
                return res.status(501).json({status:false, messege:'Password not match'});
        }

        userdata[0].password = '**********';

        console.log(userdata);
        res.status(200).json({status:true, messege:"log in successful", data:userdata[0]});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "internal server error" });
    }
};


module.exports = {
    otpGenrate,
    createUser,
    logInUser
}