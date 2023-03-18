const express = require("express");
const router = express.Router();
const {Login,addAdmin,addPlatform, addCourse, deletePlatform, deleteCourse, deleteStudent, updateStudent, getStudentData, updatePassword} = require('../controllers/adminController');
const  isAuthenticated  = require("../middleware/verifyJWT");


router.route('/login').post(Login);
router.route('/addAdmin').post(isAuthenticated,addAdmin);
// router.route('/update/password').post(isAuthenticated,updatePassword);

router.route('/addPlatform').post(isAuthenticated,addPlatform);
router.route('/addCourse').post(isAuthenticated,addCourse);
router.route('/catalog/platforms/:platformName').delete(isAuthenticated,deletePlatform);
router.route('/deleteCourse/:platformName&:courseName').delete(isAuthenticated,deleteCourse);

router.route('/delete/:rollNo').delete(isAuthenticated,deleteStudent);
router.route('/update/:rollNo').put(isAuthenticated,updateStudent);
router.route('/student/:rollNo').get(isAuthenticated,getStudentData);

module.exports = router;