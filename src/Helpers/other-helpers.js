const CustomerCollection = require('../../src/Models/customer-schema');


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

    getAllAccountantData: async (accountants) => {
        try {
            let results = new Array();
            for (i = 0; i < accountants.length; i++) {

                let customer = await CustomerCollection.findOne({ _id: accountants[i].accountant_id });

                let tmpObj = new Object();
                tmpObj._id = customer._id;
                tmpObj.accountant_email = customer.customer_email;
                tmpObj.accountant_name = customer.customer_name;
                tmpObj.accountant_mobile = customer.customer_address;
                tmpObj.accountant_img = customer.customer_image;
                tmpObj.accountant_address = customer.customer_mobile;
                tmpObj.accountant_experience = accountants[i].accountant_experience;
                tmpObj.accountant_study = accountants[i].accountant_study;
                results.push(tmpObj);
            }

            return results;

        } catch (error) {
            throw error;
        }
    },

    getAllManagerData: async (managers) => {
        try {
            let results = new Array();
            for (i = 0; i < managers.length; i++) {

                let customer = await CustomerCollection.findOne({ _id: managers[i].manager_id });

                let tmpObj = new Object();
                tmpObj._id = customer._id;
                tmpObj.manager_email = customer.customer_email;
                tmpObj.manager_name = customer.customer_name;
                tmpObj.manager_mobile = customer.customer_address;
                tmpObj.manager_img = customer.customer_image;
                tmpObj.manager_address = customer.customer_mobile;
                tmpObj.manager_skill = managers[i].manager_skill;
                tmpObj.manager_experience = managers[i].manager_experience;
                tmpObj.manager_study = managers[i].manager_study;
                results.push(tmpObj);
            }

            return results;

        } catch (error) {
            throw error;
        }
    },

};