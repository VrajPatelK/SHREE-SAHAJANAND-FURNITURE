const WorkerCollection = require('../../src/Models/system-users/worker-schema');


module.exports = {

    createWorker: async (req, res) => {
        try {

            await WorkerCollection.insertMany([{
                worker_email: req.body.add_worker_email,
                worker_name: req.body.add_worker_name,
                worker_img: req.body.add_worker_img,
                worker_mobile: req.body.add_worker_mobile,
                worker_address: req.body.add_worker_address,
                worker_study: req.body.add_worker_study
            }]);
            return res.status(201).redirect("/admin/workers");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    getWorkers: async (req, res) => {
        try {

            //render the page
            const results = await WorkerCollection.find({});
            res.status(201).render("system-users/manage-workers", { results: results });

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    updateWorkerGet: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "edit" && target_id !== undefined) {

                const result = await WorkerCollection.findOne({ _id: target_id });
                return res.status(201).render("system-users/edit-worker", { result: result });
            }

            res.status(201).send("page not found ...");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    updateWorkerPost: async (req, res) => {
        try {

            let updated_data = new Object();
            updated_data = {
                worker_email: req.body.update_worker_email,
                worker_name: req.body.update_worker_name,
                worker_mobile: req.body.update_worker_mobile,
                worker_address: req.body.update_worker_address,
            };

            if (req.body.update_worker_img) { updated_data.worker_img = req.body.update_worker_img; }
            if (req.body.update_worker_study) { updated_data.worker_study = req.body.update_worker_study; }

            await WorkerCollection.updateOne(
                { _id: req.query._id },
                { $set: updated_data }
            );
            return res.status(201).redirect("/admin/workers");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
    deleteWorker: async (req, res) => {
        try {

            let opeartion = req.query.op;
            let target_id = req.query._id;

            if (opeartion === "delete" && target_id !== undefined) {
                await WorkerCollection.deleteOne({ _id: target_id });
            }

            return res.status(201).redirect("/admin/workers");

        } catch (error) {
            return res.status(500).render("errorpage/error-page-500");
        }
    },
};