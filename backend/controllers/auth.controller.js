const  User  = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

//Multer config
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join(__dirname, '../public/uploads/'));
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

const upload = multer({storage})

const signup = async (req, res) => {
  try{
      const {username, password, role} = req.body;
      const profileImgPath = req.file.path;
      const profileImg = req.file
      if(!profileImg){
          return res.status(400).json({
          message: "No file selected"
        })
      }


    //check if user exists
    const existingUser = await User.findOne({username});
    if(existingUser){
      return res.status(409).json({
      message: "User already exists"
      })
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      profileImgPath
    });

    await newUser.save();

    //success message
    res.status(201).json({
      message: "Signup successful",
      user: newUser
    })

    }catch(err){
      console.log(err);
      res.status(500).json({
      message: "Internal server error"
    })
  }
}


const signin = async (req, res) => {
  try{
    const {username, password} = req.body;

    //check if user exists
    const user = await User.findOne({username});
    if(!user){
      return res.status(401).json({
        message: "User does not exist"
      })
    }


    //check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(401).json({
        message: "Invalid credentials"
      })
    }

    //generate token
    const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET);
    delete user.password;

    res.json({
      message: "Signin successful",
      token,
      user
    })
  }catch(err){
    console.log(err);
    res.status(500).json({
      message: "Internal server error"
    })
  }
}

module.exports = {
  signup, upload, signin
}