module.exports = {


    getAllSells: async (req, res) => {
        try {

            return res.status(200).render("trading/sells");

        } catch (error) {
            return res.status(401).send(error);
        }
    },
};