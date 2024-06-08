const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{required: true, type:String},
    email:{required: true, type:String},
    password:{required: true, type:String}
}, { 
    versionKey:false
})

const UserModel = mongoose.model("userdata", userSchema)
module.exports={UserModel}