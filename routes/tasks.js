const router = require("express").Router();
const taskController = require('../controllers/taskController');

router.get("/", taskController.list_all_tasks);
router.post("/", taskController.create_a_task);
router.get("/:taskId", taskController.read_a_task);
router.put("/:taskId", taskController.update_a_task);
router.delete("/:taskId", taskController.delete_a_task);

module.exports = router;