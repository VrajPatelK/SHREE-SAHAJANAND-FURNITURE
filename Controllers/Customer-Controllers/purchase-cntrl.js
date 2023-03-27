const BedCollection = require("../../Src/Models/products/bed-schema");
const ChairCollection = require("../../Src/Models/products/chair-schema");
const JulaCollection = require("../../Src/Models/products/jula-schema");
const MattressesCollection = require("../../Src/Models/products/mattresses-schema");
const ShoerackCollection = require("../../Src/Models/products/shoerack-schema");
const ShowcaseCollection = require("../../Src/Models/products/showcase-schema");
const SofaCollection = require("../../Src/Models/products/sofa-schema");
const TableCollection = require("../../Src/Models/products/table-schema");
const TempaleCollection = require("../../Src/Models/products/tempale-schema");
const TvUnitCollection = require("../../Src/Models/products/tvunit-schema");
const WardrobeCollection = require("../../Src/Models/products/wardrobe-schema");

const CustomerCollection = require("../../src/Models/customers/customer-schema");
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

            if (category === 'bed') product = await BedCollection.findOne({ _id: pid });
            else if (category === 'chair') product = await ChairCollection.findOne({ _id: pid });
            else if (category === 'jula') product = await JulaCollection.findOne({ _id: pid });
            else if (category === 'mattresse') { product = await MattressesCollection.findOne({ _id: pid }); category = (category + 's'); }
            else if (category === 'shoerack') product = await ShoerackCollection.findOne({ _id: pid });
            else if (category === 'showcase') product = await ShowcaseCollection.findOne({ _id: pid });
            else if (category === 'sofa') product = await SofaCollection.findOne({ _id: pid });
            else if (category === 'table') product = await TableCollection.findOne({ _id: pid });
            else if (category === 'tempale') product = await TempaleCollection.findOne({ _id: pid });
            else if (category === 'tvunit') product = await TvUnitCollection.findOne({ _id: pid });
            else if (category === 'wardrobe') product = await WardrobeCollection.findOne({ _id: pid });

            if (product === null) return res.status(200).send("product doesn't found:)");

            customer = await CustomerCollection.findOne({ _id: cid });
            if (customer === null) return res.status(200).send("account doesn't found:)");

            let favourite = await FavouriteCollection.findOne({ customer: cid });
            if (favourite === null) favourite = await FavouriteCollection.create({ customer: cid });

            let like = await LikeCollection.create({ product: pid, favourite: favourite._id, productType: category });

            // ---
            return res.status(201).json(like);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    getFavouriteByCustomer: async (req, res) => {
        try {

            let cid = res.locals.session.user._id.toString();
            let favourite = await FavouriteCollection.findOne({ customer: cid });

            if (!favourite)
                return res.status(200).json([]);

            let likeItems = await LikeCollection.find({ favourite: favourite._id }).populate('product');
            return res.status(200).json(likeItems);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    removeFavourite: async (req, res) => {
        try {
            let likeItem = null;

            let lid = req.body.lid;

            likeItem = await LikeCollection.findOne({ _id: lid });
            if (likeItem === null) return res.status(200).send("product doesn't found:)");
            let product = likeItem.product; //for res

            await LikeCollection.deleteOne({ _id: lid });
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

            if (category === 'bed') product = await BedCollection.findOne({ _id: pid });
            else if (category === 'chair') product = await ChairCollection.findOne({ _id: pid });
            else if (category === 'jula') product = await JulaCollection.findOne({ _id: pid });
            else if (category === 'mattresse') { product = await MattressesCollection.findOne({ _id: pid }); category = (category + 's'); }
            else if (category === 'shoerack') product = await ShoerackCollection.findOne({ _id: pid });
            else if (category === 'showcase') product = await ShowcaseCollection.findOne({ _id: pid });
            else if (category === 'sofa') product = await SofaCollection.findOne({ _id: pid });
            else if (category === 'table') product = await TableCollection.findOne({ _id: pid });
            else if (category === 'tempale') product = await TempaleCollection.findOne({ _id: pid });
            else if (category === 'tvunit') product = await TvUnitCollection.findOne({ _id: pid });
            else if (category === 'wardrobe') product = await WardrobeCollection.findOne({ _id: pid });

            if (customer === null) return res.status(200).send("account doesn't found:)");
            if (product === null) return res.status(200).send("product doesn't found:)");

            if (cart === null && cartItem === null) {
                cart = await CartCollection.create({ customer: cid });
                cartItem = await CartItemCollection.create({ product: pid, cart: cart._id, productType: category, quantity: 1 });
            }
            else if (cart !== null && cartItem === null) {
                cartItem = await CartItemCollection.create({ product: pid, cart: cart._id, productType: category, quantity: 1 });
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

            let cart = await CartCollection.findOne({ customer: cid });
            if (!cart)
                return res.status(200).json([]);

            let cartItems = await CartItemCollection.find({ cart: cart._id }).populate('product');
            return res.status(201).json(cartItems);

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

            let cartid = req.body.cartid;

            cartItem = await CartItemCollection.findOne({ _id: cartid });
            if (cartItem === null) return res.status(200).send("product doesn't found:)");
            let product = cartItem.product;

            await CartItemCollection.deleteOne({ _id: cartid });
            return res.status(201).json(product);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
};