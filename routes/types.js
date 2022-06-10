const router = require("express").Router();
const typeController = require('../controllers/typeController');

router.get("/", typeController.list_all_types);
router.post("/", typeController.create_a_type);
router.delete("/", typeController.delete_a_type);

module.exports = router;