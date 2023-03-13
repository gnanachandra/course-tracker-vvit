const express = require("express");
const router = express.Router();
const {addPlatform, addCourse, deletePlatform, deleteCourse, deleteStudent, updateStudent} = require('../controllers/adminController');
const { handleNewStudent } = require("../controllers/studentControllers");
 
router.route('/addPlatform').post(addPlatform);
router.route('/addCourse').post(addCourse);
router.route('/deletePlatform/:name').delete(deletePlatform);
router.route('/deleteCourse/:platformName&:courseName').delete(deleteCourse);

router.route('/delete/:rollNo').delete(deleteStudent);
router.route('/update/:rollNo').put(updateStudent);

module.exports = router;