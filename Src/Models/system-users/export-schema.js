const mongoose = require('mongoose');

const ExportSchema = new mongoose.Schema({

    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "vendor"
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
    gst: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    cgst: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    total_bill: {
        type: Number,
        required: true
    },
    date_and_time: { //not taken from admin
        type: String,
        required: true
    }
});

//=======>vendor_id, bulk & items, total - bill, date & time

const ExportCollection = mongoose.model("export", ExportSchema);
module.exports = ExportCollection;