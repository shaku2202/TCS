const jwt = require('jsonwebtoken');
const {UserModel}=require('../models/user.models');
const { blackListTokenModel } = require('../models/blacklist.models');


const auth=async(req,res,next)=>{
    const access_token=req.headers.authorization?.split(" ")[1];
    console.log(access_token);
    if(await blackListTokenModel.findOne({access_token})){
        return res.json({msg:"You have been logged out"});
    }
    if(access_token){
        try{
            const decoded=jwt.verify(access_token,"Shashank");
            const {userID}=decoded;
            const user=await UserModel.findOne({_id:userID});
            const require_role=user?.role;
            req.userID = userID;
            req.role=require_role;

            next();

        }
        catch(err){
            res.status(400).json({msg:err});
        }
    }else{
        res.json({msg:"Please Login"});
    }
}


module.exports={
    auth,
}