const express = require("express");
const {
	handlegetuser,
	handleregisteruser,
	handlepostlogin,
	handlegetregisteruser,
	handlegetlogin,
} = require("../controllers/user");
const userRouter = express.Router();

userRouter.get("/", handlegetuser);
userRouter.post("/register", handleregisteruser);
userRouter.post("/login", handlepostlogin);
userRouter.get("/register", handlegetregisteruser);
userRouter.get("/login", handlegetlogin);

module.exports = userRouter;
