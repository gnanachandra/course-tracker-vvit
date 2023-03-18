const express = require("express");
const router = express.Router();
const { handleNewStudent,addCourseController,submitQuery} = require("../controllers/studentControllers");

router.route('/register').post(handleNewStudent);
router.route('/course/new').post(addCourseController);
router.route('/query/new').post(submitQuery);

module.exports = router;