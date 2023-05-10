const express = require("express");
const router = express.Router();
const { handleNewStudent,
    addCourseController,
    submitQuery,
    login,
    getmyProfile,
    updateProfile,
    updatePassword,
    getEnrolledCourses,
    updateCourse,
    deleteCourse,
    getCatalogData
} = require("../controllers/studentControllers");
const isAuthenticated = require("../middleware/verifyJWT");

router.route('/login').post(login);
router.route('/register').post(handleNewStudent);
router.route('/course').post(isAuthenticated,addCourseController).get(isAuthenticated,getEnrolledCourses);
router.route('/course/:courseId').patch(isAuthenticated,updateCourse).delete(isAuthenticated,deleteCourse);
router.route('/profile').get(isAuthenticated,getmyProfile).post(isAuthenticated,updateProfile)
router.route('/catalog').get(getCatalogData);
router.route('/profile/password').post(isAuthenticated,updatePassword)
router.route('/query').post(isAuthenticated,submitQuery)
module.exports = router;