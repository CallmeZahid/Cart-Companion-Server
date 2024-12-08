const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    purchased:{
        type:Boolean,
        default:false
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},{timestamps:true});

const Item = mongoose.model('Item',itemSchema);

module.exports = Item;