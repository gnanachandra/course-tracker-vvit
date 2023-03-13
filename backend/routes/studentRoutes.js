const express = require("express");
const router = express.Router();
const { handleNewStudent} = require("../controllers/studentControllers");

router.route('/new').post(handleNewStudent);

module.exports = router;