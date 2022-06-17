const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");

router.post(
  "/registration",
  body("email").isEmail(),
  body("name").isLength({ min: 2, max: 32 }),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
//
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.post("/avatar", authMiddleware, userController.uploadAvatar);
router.post("/profileName", authMiddleware, userController.uploadProfileName);
router.get("/users", authMiddleware, userController.getUsers);
router.delete("/avatar", authMiddleware, userController.deleteAvatar);

module.exports = router;
