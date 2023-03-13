const CustomerCollection = require("../../src/Models/customers/customer-schema");
const SofaCollection = require("../../Src/Models/products/sofa-schema");
const LikeCollection = require("../../Src/Models/customers/like-schema");
const FavouriteCollection = require("../../Src/Models/customers/favourites-schema");

const axios = require("axios");


module.exports = {


    createFavourite: async (req, res) => {
        try {
            // console.log(req.body);
            let product = null;
            let customer = null;

            let pid = req.query.pid;
            let cid = req.query.cid;
            let category = res.locals.session.productType;

            if (category === 'sofa') product = await SofaCollection.findOne({ _id: pid });
            if (product === null) return res.status(200).send("product doesn't found:)"); 0

            customer = await CustomerCollection.findOne({ _id: cid });
            if (customer === null) return res.status(200).send("account doesn't found:)");

            let like = await LikeCollection.create({ product: pid, productType: category });

            let favourite = await FavouriteCollection.findOne({ customer: cid });
            if (favourite === null) favourite = await FavouriteCollection.create({ customer: cid, likeItems: [{ likeItem: like._id }] });
            else { favourite.likeItems.push({ likeItem: like._id }); await favourite.save(); }

            // ---
            const response = await axios.get(`http://127.0.0.1:8500/get-favourites/${cid}`);
            res.locals.session.favourites = response.data;

            return res.status(301).redirect("/admin/product/" + category);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    getFavouriteByCustomer: async (req, res) => {
        try {
            let cid = req.params.cid;

            let favourites = await FavouriteCollection.findOne({ customer: cid })
                .populate({
                    path: 'likeItems.likeItem',
                    model: 'like',
                    populate: { path: 'product' }
                });

            if (!favourites)
                return res.status(200).json([]);

            return res.status(200).json(favourites.likeItems);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    removeFavourite: async (req, res) => {
        try {
            let likeItem = null;
            let customer = null;

            let lid = req.query.lid;
            let cid = req.query.cid;
            let category = res.locals.session.productType;

            likeItem = await LikeCollection.findOne({ _id: lid });
            if (likeItem === null) return res.status(200).send("product doesn't found:)");

            customer = await CustomerCollection.findOne({ _id: cid });
            if (customer === null) return res.status(200).send("account doesn't found:)");


            let favourite = await FavouriteCollection.findOne({ customer: cid });

            let remains = favourite.likeItems.filter((currItem) => { return currItem.likeItem.toString() !== lid });
            favourite.likeItems = remains;
            await favourite.save();

            await LikeCollection.deleteOne({ _id: lid });

            // ---
            const response = await axios.get(`http://127.0.0.1:8500/get-favourites/${cid}`);
            res.locals.session.favourites = response.data;
            return res.status(301).redirect("/admin/product/" + category);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
};