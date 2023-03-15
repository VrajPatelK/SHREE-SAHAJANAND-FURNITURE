const CustomerCollection = require("../../src/Models/customers/customer-schema");
const SofaCollection = require("../../Src/Models/products/sofa-schema");
const LikeCollection = require("../../Src/Models/customers/like-schema");
const FavouriteCollection = require("../../Src/Models/customers/favourites-schema");
const CartItemCollection = require("../../Src/Models/customers/cartItems-schema");
const CartCollection = require("../../Src/Models/customers/cart-schema");

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
            return res.status(201).json(like);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    getFavouriteByCustomer: async (req, res) => {
        try {

            let cid = res.locals.session.user._id.toString();
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
            return res.status(201).json(product);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    createCart: async (req, res) => {
        try {

            let pid = req.body.pid;
            let cartid = undefined;
            let cid = res.locals.session.user._id.toString();
            let category = res.locals.session.productType;

            if (req.body.cartid)
                cartid = req.body.cartid;

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
                cart.cartItems.push({ cartItem: cartItem._id });
                await cart.save();
            }
            else if (cart !== null && cartItem !== null) {
                cartItem = await CartItemCollection.findOne({ _id: cartid });
                cartItem.quantity += 1;
                await cartItem.save();
            }

            // ---
            return res.status(201).json(cartItem);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    getCartsByCustomer: async (req, res) => {
        try {
            let cid = res.locals.session.user._id.toString();

            let cart = await CartCollection.findOne({ customer: cid })
                .populate({
                    path: 'cartItems.cartItem',
                    model: 'cart-item',
                    populate: { path: 'product' }
                });

            if (!cart)
                return res.status(200).json([]);

            return res.status(201).json(cart.cartItems);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    displayCarts: async (req, res) => {
        try {
            return res.status(200).render("customer/add-to-cart");

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    updateCart: async (req, res) => {
        try {

            let cartid = req.body.cartid;
            let quantity = req.body.quantity;
            let cartItem = null;

            cartItem = await CartItemCollection.findOne({ _id: cartid });
            if (cartItem === null) return res.status(200).send("cart doesn't found:)");

            cartItem.quantity = quantity;
            await cartItem.save();
            return res.status(201).json(cartItem);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    removeCart: async (req, res) => {
        try {
            let cartItem = null;
            let customer = null;

            let cartid = req.body.cartid;
            let cid = res.locals.session.user._id.toString();

            cartItem = await CartItemCollection.findOne({ _id: cartid });
            if (cartItem === null) return res.status(200).send("product doesn't found:)");

            customer = await CustomerCollection.findOne({ _id: cid });
            if (customer === null) return res.status(200).send("account doesn't found:)");

            let cart = await CartCollection.findOne({ customer: cid });

            let remains = cart.cartItems.filter((currItem) => { return currItem.cartItem.toString() !== cartid });
            cart.cartItems = remains;
            await cart.save();

            let result = await CartItemCollection.deleteOne({ _id: cartid });

            // ---
            return res.status(201).json(result);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
};