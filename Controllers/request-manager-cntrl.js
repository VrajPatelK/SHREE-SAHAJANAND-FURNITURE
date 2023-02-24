module.exports = {

    systemUserRequest: async (req, res) => {

        try {
            if (req.query.manage_type === "admins") {
                res.status(301).redirect("/admin/admins");
            }
            else if (req.query.manage_type === "accountants") {
                res.status(301).redirect("/admin/accountants");
            }
            else if (req.query.manage_type === "managers") {
                res.status(301).redirect("/admin/managers");
            }
            else if (req.query.manage_type === "vendors") {
                res.status(301).redirect("/admin/vendors");
            }
            else if (req.query.manage_type === "manufacturers") {
                res.status(301).redirect("/admin/manufacturers");
            }
            else if (req.query.manage_type === "workers") {
                res.status(301).redirect("/admin/workers");
            }
            else if (req.query.manage_type === "customers") {
                res.status(301).redirect("/admin/customers");
            }
            else if (req.query.manage_type === "import") {
                res.status(301).redirect("/admin/imports");
            }
            else if (req.query.manage_type === "export") {
                res.status(301).redirect("/admin/exports");
            }

        } catch (error) {
            console.log(error);
        }
    },

    productRequest: async (req, res) => {

        try {
            if (req.query.manage_type === "sofas") {
                res.status(301).redirect("/admin/product/sofas");
            }
            else if (req.query.manage_type === "beds") {
                res.status(301).redirect("/admin/product/beds");
            }
            else if (req.query.manage_type === "mattresses") {
                res.status(301).redirect("/admin/product/mattresses");
            }
            else if (req.query.manage_type === "chairs") {
                res.status(301).redirect("/admin/product/chairs");
            }
            else if (req.query.manage_type === "tables") {
                res.status(301).redirect("/admin/product/tables");
            }
            else if (req.query.manage_type === "tvunits") {
                res.status(301).redirect("/admin/product/tvunits");
            }
            else if (req.query.manage_type === "tempales") {
                res.status(301).redirect("/admin/product/tempales");
            }
            else if (req.query.manage_type === "shoeracks") {
                res.status(301).redirect("/admin/product/shoeracks");
            }
            else if (req.query.manage_type === "showcases") {
                res.status(301).redirect("/admin/product/showcases");
            }
            else if (req.query.manage_type === "julas") {
                res.status(301).redirect("/admin/product/julas");
            }
            else if (req.query.manage_type === "wardrobes") {
                res.status(301).redirect("/admin/product/wardrobes");
            }
            else if (req.query.manage_type === "others") {
                res.status(301).redirect("/admin/product/others");
            }

        } catch (error) {
            console.log(error);
        }
    },
};