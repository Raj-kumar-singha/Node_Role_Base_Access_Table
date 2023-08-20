const express = require('express'),
    router = express.Router(),
    authController = require('../controller/authController'),
    userController = require('../controller/userController'),
    feedController = require('../controller/feedController'),
    authMiddleware = require('../middleware/authMiddleware');


router.post('/register', authController.createUser);
router.post('/login', authController.login);

//? Users Api's
router.post('/createUser', authMiddleware, userController.createUser);
router.post('/getUser', authMiddleware, userController.getUser);
router.post('/updateUser', authMiddleware, userController.updateUser);
router.post('/deleteUser', authMiddleware, userController.deleteUser);


//? Feeds Api's
router.post('/createFeed', authMiddleware, feedController.createFeed);
router.post('/getFeed', authMiddleware, feedController.getFeed);
router.post('/updateFeed', authMiddleware, feedController.updateFeed);
router.post('/deleteFeed', authMiddleware, feedController.deleteFeed);

module.exports = router;