const express = require('express');
const router = express.Router();


//controllers
const {
    createWorker,
    getWorkers,
    updateWorkerGet,
    updateWorkerPost,
    deleteWorker

} = require("../../../Controllers/System-User-Controllers/worker-cntrl");

const { isAdmin } = require('../../Middlewares/isLogin');

//Middlewares
router.use(function (req, res, next) {
    if (res.locals.session.userType === "admin") { isAdmin(req, res, next); }
    else return res.status(404).render("errorpage/error-page-404");
});

router.post("/admin/workers", createWorker);
router.get("/admin/workers", getWorkers);
router.get("/admin/edit-worker", updateWorkerGet);
router.post("/admin/edit-worker", updateWorkerPost);
router.get("/admin/delete-worker", deleteWorker);



module.exports = router;