const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const CustomerSchema =new Schema({

    name :{
        type :String,
        required: true
    },
    age:{
        type: Number,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    
    type:{
        type: String,
        required:true
    },
    drivingExperiance:{
        type:String,
        required:false
    },
    liscenceYear:{
        type:Number,
        required:false
    }


})
const Customer = mongoose.model("Customer",CustomerSchema);
module.exports=Customer;