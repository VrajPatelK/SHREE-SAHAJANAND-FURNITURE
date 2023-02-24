const mongoose = require('mongoose');

const ManagerShcema = new mongoose.Schema({

    manager_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer"
    },
    manager_skill: {
        type: String,
        required: true,
    },
    manager_study: {
        type: String,
        required: true,
    },
    manager_experience: {
        type: Number,
        required: true,
        min: 0
    },
    loginTokens: [{
        token: {
            type: String,
            required: true,
            unique: true
        }
    }],
},
    { timestamps: true }
);

const ManagerCollection = mongoose.model("manager", ManagerShcema);
module.exports = ManagerCollection;