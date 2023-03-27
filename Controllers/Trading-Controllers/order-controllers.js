module.exports = {

    getAllOrders: async (req, res) => {
        try {
            return res.status(200).render("trading/orders");

        } catch (error) {
            return res.status(401).send(error);
        }
    },

};