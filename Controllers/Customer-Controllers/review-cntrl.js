const ReviewCollection = require("../../Src/Models/customers/reviews-schema");

module.exports = {
    createReviewGet: async (req, res) => {
        try {

            return res.render("customer/create-review");
        } catch (error) {
            console.log(error);
        }
    },
    createReviewPost: async (req, res) => {
        try {
            let product = req.query.pid;
            let customer = res.locals.session.user._id.toString();
            let productType = req.query.category;
            let star = req.body.star;
            let msg = req.body.msg;

            await ReviewCollection.create({ customer, product, productType, star, msg });

            return res.redirect("/my-reviews");

        } catch (error) {
            console.log(error);
        }
    },
    displayReviews: async (req, res) => {
        try {
            return res.render("customer/my-reviews");

        } catch (error) {
            console.log(error);
        }
    },
    getAllReviews: async (req, res) => {
        try {
            let customer = res.locals.session.user._id.toString();
            let reviews = await ReviewCollection.find({ customer }).populate('product');

            // logic
            return res.json({ reviews });

        } catch (error) {
            console.log(error);
        }
    },
    getReviewSet: async (req, res) => {
        try {
            let customer = res.locals.session.user._id.toString();
            let reviewProducts = await ReviewCollection.find({ customer }).select({ _id: 0, product: 1 });

            return res.json({ reviewProducts });

        } catch (error) {
            console.log(error);
        }
    },
    editReviewGet: async (req, res) => {
        try {
            let rid = req.query.rid;
            let review = await ReviewCollection.findById(rid);

            return res.render("customer/edit-review", { review });
        } catch (error) {
            console.log(error);
        }
    },
    editReviewPost: async (req, res) => {
        try {
            let rid = req.query.rid;
            let msg = req.body.msg;
            let star = req.body.star;
            let review = await ReviewCollection.findById(rid);

            review.msg = msg;
            review.star = star;

            await review.save();
            return res.redirect("/my-reviews");

        } catch (error) {
            console.log(error);
        }
    },
    deleteReview: async (req, res) => {
        try {
            let rid = req.query.rid;
            await ReviewCollection.findOneAndDelete(rid);
            return res.redirect("/my-reviews");

        } catch (error) {
            console.log(error);
        }
    },
}