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


router.post("/admin/workers", createWorker);
router.get("/admin/workers", getWorkers);
router.get("/admin/edit-worker", updateWorkerGet);
router.post("/admin/edit-worker", updateWorkerPost);
router.get("/admin/delete-worker", deleteWorker);



module.exports = router;