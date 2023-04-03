const mongoose = require('mongoose');

const ManuFacturerSchema = new mongoose.Schema({

    manufacturer_name: {
        type: String,
        required: true,
    },
    manufacturer_email: {
        type: String,
        required: true,
        unique: true
    },
    manufacturer_mobile: {
        type: Number,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    manufacturer_factory_name: {
        type: String,
        required: true
    },
    manufacturer_factory_address: {
        type: String,
        required: true
    }
});

const ManuFacturerCollection = mongoose.model("manufacturer", ManuFacturerSchema);
module.exports = ManuFacturerCollection;


// Manufacturer (Trador)-Details:-
/*
=> 
manufacturer_name, 
manufacturer_email, 
manufacturer_factory_name,
manufacturer_mobile, 
manufacturer_factory_address,
---------
bulk & items, total - bill, date & time

*/
