import mongoose from "mongoose"; 

const cartProductSchema = new mongoose.Schema({
    productId : {
        type : mongoose.Schema.ObjectId,
        ref : "product"
    },
    quntity : {
        type : Number,
        default : 0
    },
    userId:{
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },

 },{
    timestamps : true
 })

 const cartProductModel=mongoose.Schema("cartProduct",cartProductSchema)  


export default cartProductModel
