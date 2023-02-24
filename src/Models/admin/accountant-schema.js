const mongoose = require('mongoose');

const AccountantShcema = new mongoose.Schema({

    accountant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer"
    },
    accountant_study: {
        type: String,
        required: true,
    },
    accountant_experience: {
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
});



AccountantShcema.methods.createToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.loginTokens.push({ token: token });
        return token;

    } catch (error) {
        res.status(401).send(error);
    }
}

const AccountantCollection = mongoose.model("accountant", AccountantShcema);
module.exports = AccountantCollection;