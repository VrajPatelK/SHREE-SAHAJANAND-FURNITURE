const CustomerCollection = require("../src/Models/customer-schema");

module.exports = {
    googleSuccessAuth: async (req, res) => {
        try {
            if (!req.user) //req.user==null
                res.redirect('/auth/callback/failure');
            let customer = await CustomerCollection.findOne({ customer_email: req.user.email });

            if (customer === null) {

                customer = new CustomerCollection({
                    customer_email: req.user.email,
                    customer_name: req.user.displayName
                });

            }

            let token = await customer.createToken();
            await customer.save();

            res.cookie("loginCookie", token, { httpOnly: true });
            res.status(301).redirect("/");

        } catch (error) {
            console.log(error);
        }

    },

    googleFailAuth: (req, res) => {
        res.status(401).send("google-auth-error");
    }
};