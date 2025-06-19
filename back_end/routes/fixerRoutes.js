const express = require("express");
const router = express.Router();
const { fixCode } = require("../controllers/fixerController");

router.post("/", fixCode);

module.exports = router;
