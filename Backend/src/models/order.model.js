import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userid : {
            type : mongoose.Schema.ObjectId,
            ref : "User"
        },
        orderId : {
            type : String,
            required : [true,"provide orderId"],
            unique : true,      
        },
        productId : {
            type : mongoose.Schema.ObjectId,
            ref : "product"
        },
        product_details : {
            name : String,
            image : Array,
        },
        paymentId : {
            type : String,
            default : ""
        },
        payment_status : {
            type : String,
            default : ""
        },
        delivery_address : {
            type : mongoose.Schema.ObjectId,
            ref : "address"
        },
        subTotleAmt : {
            type : Number,
            default : 0
        },
        totlAmt : {
            type : Number,
            default : 0
        },
        invoice_receipt:{
            type : String,
            default : ""
        }
},{
    timestamps:true
})

const OrderModel=mongoose.Schema("order",orderSchema)


export default OrderModel


