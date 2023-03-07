const CustomerCollection = require("../src/Models/customers/customer-schema");

module.exports = {

    createCustomer: async (req, res) => {
        try {

            let customer = await CustomerCollection.findOne({ customer_email: req.body.customer_email });

            if (customer === null) {
                customer = new CustomerCollection(req.body);
            }

            let token = await customer.createToken();

            await customer.save();

            res.cookie("login", token, { httpOnly: true });
            return res.status(200).render("customer/customer-profile", { data: customer });

        } catch (error) {
            console.log(error);
        }
    },
    getCustomer: async (req, res) => {
        try {


        } catch (error) {
            console.log(error);
        }
    },
    updateCustomer: async (req, res) => {
        try {


        } catch (error) {
            console.log(error);
        }
    },
    deleteCustomer: async (req, res) => {
        try {


        } catch (error) {
            console.log(error);
        }
    },

};