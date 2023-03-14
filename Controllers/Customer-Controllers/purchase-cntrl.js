const CustomerCollection = require("../../src/Models/customers/customer-schema");
const SofaCollection = require("../../Src/Models/products/sofa-schema");
const LikeCollection = require("../../Src/Models/customers/like-schema");
const FavouriteCollection = require("../../Src/Models/customers/favourites-schema");
const CartItemCollection = require("../../Src/Models/customers/cartItems-schema");
const CartCollection = require("../../Src/Models/customers/cart-schema");

const axios = require("axios");


module.exports = {


    createFavourite: async (req, res) => {
        try {
            let product = null;
            let customer = null;
            let pid = req.body.pid;
            let cid = res.locals.session.user._id.toString();

            let category = res.locals.session.productType;
            if (category === 'sofa') product = await SofaCollection.findOne({ _id: pid });
            if (product === null) return res.status(200).send("product doesn't found:)");

            customer = await CustomerCollection.findOne({ _id: cid });
            if (customer === null) return res.status(200).send("account doesn't found:)");

            let like = await LikeCollection.create({ product: pid, productType: category });
            let favourite = await FavouriteCollection.findOne({ customer: cid });

            if (favourite === null) favourite = await FavouriteCollection.create({ customer: cid, likeItems: [{ likeItem: like._id }] });

            else { favourite.likeItems.push({ likeItem: like._id }); await favourite.save(); }

            // ---
            const response = await axios.get(`http://127.0.0.1:8500/get-favourites/${cid}`);
            res.locals.session.favourites = response.data;
            return res.status(201).json(like);

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

            let lid = req.body.lid;
            let cid = res.locals.session.user._id.toString();

            likeItem = await LikeCollection.findOne({ _id: lid });
            if (likeItem === null) return res.status(200).send("product doesn't found:)");
            let product = likeItem.product._id; //for res

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
            return res.status(201).json(product);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    createCart: async (req, res) => {
        try {

            let pid = req.query.pid;
            let cid = req.query.cid;
            let cartid = req.query.cartid;
            let category = res.locals.session.productType;

            let cart = null;
            let cartItem = null;
            let customer = null;
            let product = null;

            cart = await CartCollection.findOne({ customer: cid });
            cartItem = await CartItemCollection.findOne({ _id: cartid });
            customer = await CustomerCollection.findOne({ _id: cid });
            if (category === 'sofa') product = await SofaCollection.findOne({ _id: pid });

            if (customer === null) return res.status(200).send("account doesn't found:)");
            if (product === null) return res.status(200).send("product doesn't found:)");

            if (cart === null && cartItem === null) {
                cartItem = await CartItemCollection.create({ product: pid, productType: category, quantity: 1 });
                cart = await CartCollection.create({ customer: cid, cartItems: [{ cartItem: cartItem._id }] });
            }
            else if (cart !== null && cartItem === null) {
                cartItem = await CartItemCollection.create({ product: pid, productType: category, quantity: 1 });
            }
            else if (cart !== null && cartItem !== null) {
                cartItem = await CartItemCollection.findOne({ _id: cartid });
                cartItem.quantity += 1;
                await cartItem.save();
            }
            else { cart.cartItems.push({ cartItem: cartItem._id }); await cart.save(); }

            // ---
            const response = await axios.get(`http://127.0.0.1:8500/get-carts/${cid}`);
            res.locals.session.carts = response.data;

            return res.status(301).redirect("/admin/product/" + category);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    getCartByCustomer: async (req, res) => {
        try {
            let cid = req.params.cid;

            let cart = await CartCollection.findOne({ customer: cid })
                .populate({
                    path: 'cartItems.cartItem',
                    model: 'cart-item',
                    populate: { path: 'product' }
                });

            if (!cart)
                return res.status(200).json([]);

            return res.status(200).json(cart.cartItems);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    removeCart: async (req, res) => {
        try {
            let cartItem = null;
            let customer = null;

            let cartid = req.query.cartid;
            let cid = req.query.cid;
            let category = res.locals.session.productType;

            cartItem = await CartItemCollection.findOne({ _id: cartid });
            if (cartItem === null) return res.status(200).send("product doesn't found:)");

            customer = await CustomerCollection.findOne({ _id: cid });
            if (customer === null) return res.status(200).send("account doesn't found:)");

            let cart = await CartCollection.findOne({ customer: cid });

            let remains = cart.cartItems.filter((currItem) => { return currItem.cartItem.toString() !== cartid });
            cart.cartItems = remains;
            await cart.save();

            await CartItemCollection.deleteOne({ _id: cartid });

            // ---
            const response = await axios.get(`http://127.0.0.1:8500/get-carts/${cid}`);
            res.locals.session.carts = response.data;
            return res.status(301).redirect("/admin/product/" + category);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
};