const Admin = require('../modals/Admin');

const Login = async (req,res)=>{

    const {username , password} = req.body;
    // console.log(username,password);

    try{

        const userdata = await Admin.find({username : username});
        // console.log(userdata[0].password);

        if(userdata.length === 0) {

            return res.status(404).json({status:false,message:'user not found'})
        }

        if(userdata[0].password != password) {

            return res.status(501).json({status:false,message:'password not matched'})
        }
    
        res.status(200).json({status:true,message:'Login Successful',data:userdata})
    }
    catch(err){

        res.status(500).json({status:false,message:'internal server error'})
    }
}

module.exports = Login;