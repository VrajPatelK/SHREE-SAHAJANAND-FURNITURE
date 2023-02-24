const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({

    vendor_email: {
        type: String,
        required: true,
        unique: true
    },
    vendor_name: {
        type: String,
        required: true
    },
    vendor_mobile: {
        type: Number,
        required: true,
        unique: true,
        minLength: 10,
        maxLength: 10
    },
    vendor_shop_name: {
        type: String,
        required: true
    },
    vendor_shop_address: {
        type: String,
        required: true
    }
});


// Vendor-Details:-
// => vendor-name, email, shop-name, shop-address, mobile

const VendorCollection = mongoose.model("vendor", VendorSchema);
module.exports = VendorCollection;
