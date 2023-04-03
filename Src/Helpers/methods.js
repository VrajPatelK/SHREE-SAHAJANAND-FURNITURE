const jsonwebtoken = require("jsonwebtoken");
const fs = require('fs');
const VendorCollection = require('../Models/admin/vendor-schema');
const ManuFacturerCollection = require("../Models/admin/manufacturer-schema");

function getMin(number) {
    return (number * 60 * 1e3);
}

function findAdmin(array, target) {
    array.forEach(element => {
        if (element.email === target)
            return true;
    });
    return false;
}

function createToken(_id, secret_key) {
    console.log(secret_key);
    return jsonwebtoken.sign({ _id: _id }, secret_key);
}




module.exports = {
    getMin,
    findAdmin,
    createToken,
    also_add_vendor_details,
    also_add_manufacturer_details
};