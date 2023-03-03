const CustomerCollection = require("../../client/src/Models/customer-schema");

module.exports = {

    createCustomer: async (req, res) => {
        try {

            res.end();

        } catch (error) {
            console.log(error);
        }
    },
    getCustomer: async (req, res) => {
        try {

            // const customer = await CustomerCollection.findOne({});

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