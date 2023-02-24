const mongoose = require('mongoose');

const UserTypeSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer"
    },
    user_types: { type: Array }
});

const UserTypeCollection = mongoose.model("user-type", UserTypeSchema);
module.exports = UserTypeCollection;
