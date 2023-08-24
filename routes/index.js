const express = require('express'),
    router = express.Router(),
    authController = require('../controller/authController'),
    userController = require('../controller/userController'),
    feedController = require('../controller/feedController'),
    authMiddleware = require('../middleware/authMiddleware');

//? Authentication Api's
router.post('/register', authController.createUser);  //==> Normal registration without any X-access-token
router.post('/login', authController.login);
router.post('/logout', authController.logout);

//? Users Api's
router.post('/createUser', authMiddleware, userController.createUser);
router.get('/getUser/:id', authMiddleware, userController.getUser);
router.put('/updateUser/:id', authMiddleware, userController.updateUser);
router.delete('/deleteUser/:id', authMiddleware, userController.deleteUser);


//? Feeds Api's
router.post('/createFeed', authMiddleware, feedController.createFeed);
router.get('/getFeed/:id', authMiddleware, feedController.getFeed);
router.put('/updateFeed/:id', authMiddleware, feedController.updateFeed);
router.delete('/deleteFeed/:id', authMiddleware, feedController.deleteFeed);

module.exports = router;