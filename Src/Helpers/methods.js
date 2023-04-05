const jsonwebtoken = require("jsonwebtoken");
const fs = require('fs');

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
};