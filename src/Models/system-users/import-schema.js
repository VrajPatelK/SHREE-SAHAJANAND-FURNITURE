const mongoose = require('mongoose');

const ImportSchema = new mongoose.Schema({

    key_manufacturer_email: {
        type: String,
        required: true
    },
    item_info: {
        item_name: {
            type: String,
            required: true
        },
        item_quantity: {
            type: Number,
            required: true,
            min: 1
        },
        item_price: {
            type: Number,
            required: true,
            min: 1
        }
    },
    total_bill: {
        type: Number,
        required: true
    },
    date_and_time: { //not taken from admin
        type: String,
        required:true
    }
});

//=======>manufacturer_id, bulk & items, total - bill, date & time

const ImportCollection = mongoose.model("import", ImportSchema);
module.exports = ImportCollection;