const mongoose = require('mongoose');

const brandSalesDailySchema = new mongoose.Schema(
    {
        date:{
            type:Date,
            default:Date.now 
        },
        brand: {
            type: String, 
            required: true
        },
        transactionType: {
            type: String, 
            required: true,
            enum:['Facilitation', 'Trading']
        },
        totalOrders:{
            type: Number, 
            required: true
        },
        totalOrderValue: {
            type: Number, 
            required: true
        },
        grossMarginPercentage: {
            type: Number, 
            required: true
        }
},{timestamps: true});

brandSalesDailySchema.method.joiValidate = function(obj){
    var joi = require('joi');
    var schema = {
        date: joi.date().iso(),
        brand: joi.string().required(),
        transactionType: joi.string().required().enum(['Facilitation', 'Trading']),
        totalOrders: joi.number().integer(13),
        totalOrderValue: joi.number().integer(12000),
        grossMarginPercentage: joi.number().integer(4) 
    }
    return joi.validate(obj, schema);
}


module.exports = mongoose.model('brand_sales_daily', brandSalesDailySchema);