const router = require("express").Router();
const userController = require('../controllers/userController');

router.get("/", userController.list_all_users);

module.exports = router;