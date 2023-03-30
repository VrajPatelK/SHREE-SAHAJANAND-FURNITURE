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
const OrderItemCollection = require("../../Src/Models/customers/orderItems-schema");
const OrderCollection = require("../../Src/Models/customers/orders-schema");

const Razorpay = require("razorpay");
const crypto = require("crypto");


module.exports = {


    createFavourite: async (req, res) => {
        try {
            let product = null;
            let customer = null;
            let pid = req.body.pid;
            let cid = res.locals.session.user._id.toString();
            let category = res.locals.session.page;

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
    displayFavourites: async (req, res) => {
        try {
            return res.status(200).render("customer/my-favs");

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
            let category = res.locals.session.page;

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
            res.locals.session.page = "cart";
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

    createOrder: async (req, res) => {
        try {

            let category = res.locals.session.page;
            let cid = res.locals.session.user._id.toString();

            let items = [];
            let cart = null;
            if (category === "cart") {
                cart = await CartCollection.findOne({ customer: cid });
                if (cart === null) return res.json({ error: "cart doesn't found" });

                // delete the cart on success payment
                await CartCollection.findByIdAndDelete(cart._id);

                let cartid = req.body.id;
                items = await CartItemCollection.find({ cart: cartid }).populate('product');

            }
            else {

                let product = null;
                let pid = req.body.id;

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

                items.push(product);
            }

            let order = await OrderCollection.create({ customer: cid });
            let totalBill = 0;
            let totalDiscount = 0;

            for (let i = 0; i < items.length; i++) {

                let item = items[i];

                // billing...
                if (category === "cart") {
                    let order_total = Math.ceil(item.product.price * item.quantity);
                    let order_discount = Math.floor(order_total * (item.product.discount / 100));
                    totalBill += order_total;
                    totalDiscount += order_discount;

                    let orderItem = await OrderItemCollection.create({
                        order: order._id.toString(),
                        product: item.product._id.toString(),
                        productType: item.productType,
                        quantity: item.quantity
                    });

                    // delete the cart-items on success payment
                    await CartItemCollection.findByIdAndDelete(item._id);

                } else {
                    let order_total = Math.ceil(item.price * 1);
                    let order_discount = Math.floor(order_total * (item.discount / 100));
                    totalBill += order_total;
                    totalDiscount += order_discount;

                    let orderItem = await OrderItemCollection.create({
                        order: order._id.toString(),
                        product: item._id.toString(),
                        productType: item.category,
                        quantity: 1
                    });
                }
            }

            order.totalBill = totalBill;
            order.totalDiscount = totalDiscount;
            order.orderDate = new Date();
            await order.save();

            return res.status(201).json(order);

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    getOrdersByCustomer: async (req, res) => {
        try {
            let cid = res.locals.session.user._id.toString() || "640c984d08a3e51047b2419c";

            let temp = await OrderCollection.find({ customer: cid });
            let orders = temp;

            if (orders.length == 0)
                return res.status(200).json([]);

            let items = [];
            for (let i = 0; i < orders.length; i++) {
                let orderItems = await OrderItemCollection.find({ order: orders[i]._id }).populate('product');
                items.push({ oid: orders[i]._id.toString(), orderItems: orderItems });
            }

            return res.status(201).json({ orders: orders, itemArr: items });

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    displayOrders: async (req, res) => {
        try {
            return res.status(200).render("customer/my-orders");

        } catch (error) {
            return res.status(401).send(error);
        }
    },
    paymentOrder: async (req, res) => {
        try {
            const instance = new Razorpay({
                key_id: process.env.KEY_ID,
                key_secret: process.env.KEY_SECRET,
            });

            const options = {
                amount: req.body.amount * 100,
                currency: "INR",
                receipt: crypto.randomBytes(10).toString("hex"),
            };

            instance.orders.create(options, (error, order) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "Something Went Wrong!" });
                }
                res.status(200).json({ data: order });
            });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error!" });
            console.log(error);
        }
    },
    paymentVerify: async (req, res) => {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
                req.body;
            const sign = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSign = crypto
                .createHmac("sha256", process.env.KEY_SECRET)
                .update(sign.toString())
                .digest("hex");
            let pid = req.body.pid;


            if (razorpay_signature === expectedSign) {
                res.status(200).json({ message: "Payment verified successfully", paymentStatus: true });
            } else {
                return res.status(400).json({ message: "Invalid signature sent!" });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error!" });
            console.log(error);
        }
    }
};