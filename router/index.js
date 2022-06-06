const Router = require ('express').Router;
const userController = require ('../controller/user-controller');
const Friends = require ('../controller/addfriend-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');


router.post('/registration',
    body('email').isEmail(), 
    body('password').isLength({min: 3, max: 32}), 
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/users/:id', authMiddleware, userController.getUserOne);
router.post('/users/addfriends', authMiddleware, Friends.addFriends);
router.post('/users/acceptFriends', authMiddleware, Friends.acceptFriends);
router.post('/users/rejectedFriends', authMiddleware, Friends.rejectedFriends);





module.exports = router;