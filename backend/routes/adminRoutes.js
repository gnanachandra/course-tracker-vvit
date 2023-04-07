const express = require("express");
const router = express.Router();
const {login,addAdmin,updateQuery,deleteQuery,addPlatform, addCourse, deletePlatform, deleteCourse, deleteStudent, getStudentData, getCatalogData, getQueries} = require('../controllers/adminControllers');
const  isAuthenticated  = require("../middleware/verifyJWT");


router.route('/login').post(login);
router.route('/addAdmin').post(addAdmin); 
// router.route('/update/password').post(isAuthenticated,updatePassword);

router.route('/platform').post(isAuthenticated,addPlatform)
router.route('/platform/:name').delete(isAuthenticated,deletePlatform)

router.route('/courses').post(isAuthenticated,addCourse);
router.route('/courses/:platformName/:courseName').delete(isAuthenticated,deleteCourse);

router.route('/getCatalog').get(isAuthenticated,getCatalogData);

router.route('/student/:rollNo').delete(isAuthenticated,deleteStudent).get(isAuthenticated,getStudentData);

router.route('/queries').get(isAuthenticated,getQueries);
router.route('/queries/:id').patch(isAuthenticated,updateQuery).delete(isAuthenticated,deleteQuery);

module.exports = router;