const express = require('express');
const router = express.Router();


//controllers
const {
    getAllSells
} = require("../../Controllers/sells-controllers");

router.get("/admin/sells", getAllSells);

module.exports = router;