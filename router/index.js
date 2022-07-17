const Router = require("express").Router;
const userController = require("../controller/user-controller");
const Friends = require("../controller/addfriend-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const roleMiddleware = require("../middlewares/role-middleware");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]){8,}/),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/users", roleMiddleware(["Admin"]), userController.getUsers);
router.get("/users/:id", roleMiddleware(["Admin"]), userController.getUserOne);
router.get("/user", authMiddleware, userController.getUsers);
router.post("/users/addfriends", authMiddleware, Friends.addFriends);
router.post("/users/acceptFriends", authMiddleware, Friends.acceptFriends);
router.post("/users/rejectedFriends", authMiddleware, Friends.rejectedFriends);

module.exports = router;