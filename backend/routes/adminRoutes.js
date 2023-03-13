const express = require("express");
const router = express.Router();
const {addPlatform, addCourse, deletePlatform, deleteCourse} = require('../controllers/adminController');
 
router.route('/addPlatform').post(addPlatform);
router.route('/addCourse').post(addCourse);
router.route('/deletePlatform/:name').delete(deletePlatform);
router.route('/deleteCourse/:platformName&:courseName').delete(deleteCourse);
module.exports = router;