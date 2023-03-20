const express = require("express");
const router = express.Router();
const { handleNewStudent,addCourseController,submitQuery, login} = require("../controllers/studentControllers");
router.route('/login').post(login);
router.route('/register').post(handleNewStudent);
router.route('/course/new').post(addCourseController);
router.route('/query/new').post(submitQuery);

module.exports = router;