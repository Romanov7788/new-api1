const Router = require("express").Router;
const userController = require("../controller/user-controller");
const Friends = require("../controller/addfriend-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const ifAdminHasAccessToAdminPage = require("../middlewares/role-middleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/refresh", userController.refresh);
router.get("/users", ifAdminHasAccessToAdminPage(["Admin"]), userController.getUsers);
router.get("/users/:id", ifAdminHasAccessToAdminPage(["Admin"]), userController.getUserOne);
router.get("/user", authMiddleware, userController.getMe);
router.post("/users/addfriends", authMiddleware, Friends.addFriends);
router.post("/users/acceptFriends", authMiddleware, Friends.acceptFriends);
router.post("/users/rejectedFriends", authMiddleware, Friends.rejectedFriends);

module.exports = router;
