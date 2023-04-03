const SellItemCollection = require("../Src/Models/system-users/sellItems-schema");
const SellCollection = require("../Src/Models/system-users/sells-schema");

module.exports = {

    displaySells: async (req, res) => {
        try {

            return res.status(200).render("trading/sells");

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    getAllSells: async (req, res) => {
        try {

            let sells = await SellCollection.find({});
            return res.status(201).json(sells);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
};