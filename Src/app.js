require("dotenv").config();
require('./DB/connection');

const path = require('path');
const body_parser = require("body-parser");
const session = require('express-session');
const express = require('express');
const cookie_parser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 8500;


//middleware used-------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(body_parser.json({ limit: '10mb' }));
app.use(body_parser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(`${__dirname}`, `../Public`)));
app.use(cookie_parser());
app.use(session({
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

//pre-defined things--------------

app.set("view engine", "ejs");
app.set("views", path.join(`${__dirname}`, `../Templates/Views/`));



//routers
const static_routers = require("./Routers/static-routers");
const customer_routers = require("./Routers/Customer-Routers/customer-routers");
const system_user_login_routers = require("./Routers/System-User-Routers/system-user-login-routers");

const request_manager_routers = require("./Routers/request-manager-routers");
const admin_routers = require("./Routers/System-User-Routers/admin-routers");
const accountant_routers = require("./Routers/System-User-Routers/accountant-routers");
const manager_routers = require("./Routers/System-User-Routers/manager-routers");
const worker_routers = require("./Routers/System-User-Routers/worker-routers");
const manufacturer_routers = require("./Routers/System-User-Routers/manufacturer-routers");
const vendor_routers = require("./Routers/System-User-Routers/vendor-routers");
const import_routers = require("./Routers/Import-Export-Routers/import-routers");
const export_routers = require("./Routers/Import-Export-Routers/export-routers");
const sell_routers = require("./Routers/Trading-Routers/sell-routers");
const order_routers = require("./Routers/Trading-Routers/order-routers");
const purchase_routers = require("./Routers/Customer-Routers/purchase-routers");

const product_create_routers = require("./Routers/Product-Routers/product-create-routers");
const product_read_routers = require("./Routers/Product-Routers/product-read-routers");
const product_update_routers = require("./Routers/Product-Routers/product-update-routers");
const product_delete_routers = require("./Routers/Product-Routers/product-delete-routers");
const ManagerCollection = require("./Models/system-users/manager-schema");


// sys-user-req ,products-req
app.get("/admin/manage", request_manager_routers);

//static
app.get("/home", static_routers);
app.get("/about", static_routers);
app.get("/contact", static_routers);

//customers
app.get("/customer-register", customer_routers);
app.post("/customer-register", customer_routers);
app.get("/", customer_routers);
app.post("/", customer_routers);
app.get("/customer-profile", customer_routers);
app.get("/customer-profile/edit", customer_routers);
app.post("/customer-profile/edit", customer_routers);
app.get("/customer-logout", customer_routers);
app.get("/customer-delete", customer_routers);

//sys-user-login
app.get("/sys-user/login", system_user_login_routers);
app.post("/sys-user/login", system_user_login_routers);
app.get("/sys-user/logout", system_user_login_routers);

// admins
app.get("/admin/admins", admin_routers);
app.get("/admin/edit-admin", admin_routers);
app.post("/admin/edit-admin", admin_routers);
app.get("/admin/delete-admin", admin_routers);

// Accountants
app.get("/admin/create-accountant", accountant_routers);
app.post("/admin/create-accountant", accountant_routers);
app.get("/admin/accountants", accountant_routers);
app.get("/admin/edit-accountant", accountant_routers);
app.post("/admin/edit-accountant", accountant_routers);
app.get("/admin/delete-accountant", accountant_routers);

// Managers
app.get("/admin/create-manager", manager_routers);
app.post("/admin/create-manager", manager_routers);
app.get("/admin/managers", manager_routers);
app.get("/admin/edit-manager", manager_routers);
app.post("/admin/edit-manager", manager_routers);
app.get("/admin/delete-manager", manager_routers);

// Workers
app.post("/admin/workers", worker_routers);
app.get("/admin/workers", worker_routers);
app.get("/admin/edit-worker", worker_routers);
app.post("/admin/edit-worker", worker_routers);
app.get("/admin/delete-worker", worker_routers);

// Manufacturers
app.post("/admin/manufacturers", manufacturer_routers);
app.get("/admin/manufacturers", manufacturer_routers);
app.get("/admin/edit-manufacturer", manufacturer_routers);
app.post("/admin/edit-manufacturer", manufacturer_routers);
app.get("/admin/delete-manufacturer", manufacturer_routers);

// Vendors
app.post("/admin/vendors", vendor_routers);
app.get("/admin/vendors", vendor_routers);
app.get("/admin/edit-vendor", vendor_routers);
app.post("/admin/edit-vendor", vendor_routers);
app.get("/admin/delete-vendor", vendor_routers);

// Import
app.post("/admin/imports", import_routers);
app.get("/admin/imports", import_routers);
app.get("/admin/edit-import", import_routers);
app.post("/admin/edit-import", import_routers);
app.get("/admin/delete-import", import_routers);

// Export
app.post("/admin/exports", export_routers);
app.get("/admin/exports", export_routers);
app.get("/admin/edit-export", export_routers);
app.post("/admin/edit-export", export_routers);
app.get("/admin/delete-export", export_routers);

// -------- for products --------
app.post("/product/bed", product_create_routers);
app.post("/product/chair", product_create_routers);
app.post("/product/jula", product_create_routers);
app.post("/product/mattresse", product_create_routers);
app.post("/product/shoerack", product_create_routers);
app.post("/product/showcase", product_create_routers);
app.post("/product/sofa", product_create_routers);
app.post("/product/table", product_create_routers);
app.post("/product/tempale", product_create_routers);
app.post("/product/tvunit", product_create_routers);
app.post("/product/wardrobe", product_create_routers);

app.get("/product/:category", product_read_routers);
app.get("/product", product_read_routers);

app.get("/product/:category/edit/:pid", product_update_routers);
app.post("/product/bed/edit/:pid", product_update_routers);
app.post("/product/chair/edit/:pid", product_update_routers);
app.post("/product/jula/edit/:pid", product_update_routers);
app.post("/product/mattresse/edit/:pid", product_update_routers);
app.post("/product/shoerack/edit/:pid", product_update_routers);
app.post("/product/showcase/edit/:pid", product_update_routers);
app.post("/product/sofa/edit/:pid", product_update_routers);
app.post("/product/table/edit/:pid", product_update_routers);
app.post("/product/tempale/edit/:pid", product_update_routers);
app.post("/product/tvunit/edit/:pid", product_update_routers);
app.post("/product/wardrobe/edit/:pid", product_update_routers);

app.get("/product/:category/delete/:pid", product_delete_routers);

//trading
app.get("/admin/sells", sell_routers);
app.get("/admin/orders", order_routers);

// purchase
//fav
app.post('/add-to-fav', purchase_routers);
app.post('/rmv-to-fav', purchase_routers);
app.get('/get-favourites', purchase_routers);
//cart
app.post('/add-to-cart', purchase_routers);
app.post('/rmv-to-cart', purchase_routers);
app.get('/get-carts', purchase_routers);
app.get('/carts', purchase_routers);
app.post('/update-cart', purchase_routers);


//searchin ...
app.get('/autocomplete/', (req, res) => {

    var regex = new RegExp(req.query['term'], 'i');
    var managers = ManagerCollection.find(
        { manager_email: regex },
        { 'manager_email': 1 },
    )
        .sort({ 'updated_at': -1 })
        .sort({ 'created_at': -1 })
        .limit(20);

    managers.exec(function (err, data) {

        var result = [];
        if (!err) {
            if (data && data.length && data.length > 0) {
                data.forEach((user) => {
                    let Obj = { id: user._id, label: user.manager_email };
                    result.push(Obj);
                });
            }
            res.jsonp(result);
        }
    })
});

app.post("/filter-products", product_read_routers);

app.listen(PORT, () => {
    console.log(`connection successfully... at http://127.0.0.1:${PORT}`);
});