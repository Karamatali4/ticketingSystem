const express = require("express");
const { register, login, signOut, currentUser, registerAnyUser } = require("../controllers/auth");
const { verifyToken, isClient, isAgent, AdminAndManager } = require("../middleware/verifying");

const router = express.Router();

router.post("/signup", register);
router.post("/create-user", registerAnyUser);

router.get("/signout", signOut);
router.post("/signin", login);

router.get("/current-client", verifyToken, isClient, currentUser);
router.get("/current-agent", verifyToken, isAgent, currentUser);
router.get("/current-admin", verifyToken, AdminAndManager, currentUser);

module.exports = router;
