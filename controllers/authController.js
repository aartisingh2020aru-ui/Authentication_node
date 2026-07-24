const User = require("../models/User");
const bcrypt = require("bcrypt");


// register
exports.register = async(req,res)=>{

    try{
        const {name,email,password,confirm_password} = req.body;
        const existUser = await User.findOne({email});

        if(existUser){
            return res.status(400).js({
                message:"Email already exists"
            });
        }

        if(password !== confirm_password){
            return res.status(400).json({mes: "passwords do not match"});
        }   

        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        });

        res.status(201).json({
            message:"user registered",
            user
        });
    }


    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};




// login

exports.login = async(req,res)=>{
    try{
        const {email,password}= req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message:"invalid Email"
            });
        }

        const match = await bcrypt.compare(password,user.password);

        if(!match){
            return res.status(400).json({
                message:"invalid Password"
            });
        }

        res.json({
            message:"Login Successful!!"
        });
    }

    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

