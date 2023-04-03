const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");


const AdminLoginSchema = new mongoose.Schema({

    admin_email: { type: String, required: true, unique: true },
    admin_pass: { type: String, required: true },
    admin_name: { type: String, },
    admin_img: { type: String, },
    loginTokens: [{
        token: { type: String, required: true },
    }],
});

AdminLoginSchema.methods.createToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.loginTokens.push({ token: token });

        return token;

    } catch (error) {
        return res.status(500).render("errorpage/error-page-500");
    }
}

const AdminCollection = mongoose.model("admin", AdminLoginSchema);
module.exports = AdminCollection;