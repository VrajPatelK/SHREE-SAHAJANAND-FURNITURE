const mongoose = require('mongoose');

const AccountantShcema = new mongoose.Schema({

    accountant_email: { type: String, required: true, unique: true },
    accountant_pass: { type: String, required: true },
    accountant_name: { type: String, required: true, },
    accountant_image: { type: String },
    accountant_mobile: {
        type: Number,
        unique: true,
        required: true,
        minlength: [10, "Mobile number must be of 10 digits"],
        maxlength: [10, "Mobile number must be of 10 digits"]
    },
    accountant_address: { type: String, required: true },
    accountant_study: { type: String, required: true, },
    accountant_experience: { type: Number, required: true, min: 0 },
    loginTokens: [{ token: { type: String, } }],
},
    { timestamps: true }
);



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