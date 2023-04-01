const CustomerCollection = require('../Models/customers/customer-schema');


module.exports = {

    getAllFileNames: (dir) => {
        let explore = ["./Images/temporary/static-products-images/explore/explore-1.jpg",
            "./Images/temporary/static-products-images/explore/explore-2.jpg",
            "./Images/temporary/static-products-images/explore/explore-3.jpg",
            "./Images/temporary/static-products-images/explore/explore-4.jpg",
            "./Images/temporary/static-products-images/explore/explore-5.jpg",
            "./Images/temporary/static-products-images/explore/explore-6.jpg",
            "./Images/temporary/static-products-images/explore/explore-7.jpg"];
        let trending = ["./Images/temporary/static-products-images/trending/trending-1.jpg",
            "./Images/temporary/static-products-images/trending/trending-2.jpg",
            "./Images/temporary/static-products-images/trending/trending-3.jpg",
            "./Images/temporary/static-products-images/trending/trending-4.jpg",
            "./Images/temporary/static-products-images/trending/trending-5.jpg",
            "./Images/temporary/static-products-images/trending/trending-6.jpg",
            "./Images/temporary/static-products-images/trending/trending-7.jpg",
            "./Images/temporary/static-products-images/trending/trending-8.jpg"];
        let seller = ["./Images/temporary/static-products-images/seller/seller-1.jpg",
            "./Images/temporary/static-products-images/seller/seller-2.jpg",
            "./Images/temporary/static-products-images/seller/seller-3.jpg",
            "./Images/temporary/static-products-images/seller/seller-4.jpg",
            "./Images/temporary/static-products-images/seller/seller-6.jpg",
            "./Images/temporary/static-products-images/seller/seller-7.jpg",
            "./Images/temporary/static-products-images/seller/seller-8.jpg"];
        let review = [
            { link: "./Images/temporary/review-pics/review-pic-1.jpg", name: "John" },
            { link: "./Images/temporary/review-pics/review-pic-2.jpg", name: "Alisha" },
            { link: "./Images/temporary/review-pics/review-pic-3.jpg", name: "Smith" },
            { link: "./Images/temporary/review-pics/review-pic-4.jpg", name: "Maevin" }];
        let quality = ["./Images/temporary/about-images/quality-1.png",
            "./Images/temporary/about-images/quality-2.png",
            "./Images/temporary/about-images/quality-3.png",
            "./Images/temporary/about-images/quality-4.png",
            "./Images/temporary/about-images/quality-5.png",
            "./Images/temporary/about-images/quality-6.png",
            "./Images/temporary/about-images/quality-7.png"];



        if (dir === "explore") return explore;
        else if (dir === "trending") return trending;
        else if (dir === "seller") return seller;
        else if (dir === "review") return review;
        else if (dir === "quality") return quality;
    },
    makeid: async (length) => {
        try {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            return result;
        } catch (error) {
            console.log(error);
        }
    }
};