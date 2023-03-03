const mongoose = require('mongoose');

const WorkerShcema = new mongoose.Schema({

    worker_name: {
        type: String,
        required: true,
    },
    worker_email: {
        type: String,
        unique: true
    },
    worker_mobile: {
        type: Number,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    worker_img: {
        type: String,
    },
    worker_address: {
        type: String,
        required: true,
    },
    worker_study: {
        type: String
    }
});


const WorkerCollection = mongoose.model("worker", WorkerShcema);
module.exports = WorkerCollection;