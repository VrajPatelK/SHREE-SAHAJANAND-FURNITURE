const OrderItemCollection = require("../../Src/Models/customers/orderItems-schema");
const OrderCollection = require("../../Src/Models/customers/orders-schema");

module.exports = {

    displayOrders: async (req, res) => {
        try {
            return res.status(200).render("trading/orders");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    getAllOrders: async (req, res) => {
        try {

            let orders = await OrderCollection.find();

            if (orders.length == 0)
                return res.status(200).json([]);

            let items = [];
            for (let i = 0; i < orders.length; i++) {
                let orderItems = await OrderItemCollection.find({ order: orders[i]._id }).populate('product');
                items.push({ oid: orders[i]._id.toString(), orderItems: orderItems });
            }

            return res.status(201).json({ orders: orders, itemArr: items });

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    deliverOrder: async (req, res) => {
        try {
            let oid = req.body.oid;
            let order = await OrderCollection.findOne({ _id: oid });
            if (order === null) return res.json({ msg: "order doesn't found" });

            order.isReached = true;
            await order.save();
            return res.json({ status: "ok" });

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    deliverOrderUncheck: async (req, res) => {
        try {
            let oid = req.body.oid;
            let order = await OrderCollection.findOne({ _id: oid });
            if (order === null) return res.json({ msg: "order doesn't found" });

            order.isReached = false;
            await order.save();
            return res.json({ status: "ok" });

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
};