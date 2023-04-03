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
            return res.status(500).render("errorpage/error-page-500");
        }
    },
};