const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User.model");
require("dotenv").config()
const jwt = require('jsonwebtoken');
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    let hasspassword = await bcrypt.hash(password, 5);
    const newUser = new UserModel({ name, email, password: hasspassword });
    await newUser.save();
   return   res.status(200).json({ message: "User registered successfully.", newUser });
  } catch (error) {
   return  res.status(404).send({
      message: error.message,
      error,
    });
  }
});
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let userData = await UserModel.findOne({ email });
    if (!userData) {
      return   res.status(404).send({
        messages: "User Doest Not Exit",
      });
     
    }
   let isPasswordValid = await  bcrypt.compare(password, userData.password);
   if(!isPasswordValid){
    return  res.status(404).send({message:"User Password Is Invalid"})
   }
   const token = jwt.sign(
    { userId: userData._id,},
    process.env.JWT_SECRET,
    { expiresIn: "5h" }
  );

  return  res.status(200).send({
    token, 
    message:"User Login Successfully",
    userData
 })

  } catch (error) {
   return  res.status(404).send({
      message: error.message,
      error,
    });
  }
});

module.exports = { userRouter };
