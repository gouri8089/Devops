const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

router.post(
  "/add-alert",
  authMiddleware,
  upload.single("document"),
  userController.addAlert
);

module.exports = router;
