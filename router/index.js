const Router = require ('express').Router;
const userController = require ('../controller/user-controller');
const router = new Router();
const {body} = require('express-validator');


router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}), 
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserOne);
router.post('/users/addfriends', userController.addFriends);
// router.post('/users/acceptFriends', userController.acceptFriends);
router.post('/users/rejectedFriends', userController.rejectedFriends);





module.exports = router;