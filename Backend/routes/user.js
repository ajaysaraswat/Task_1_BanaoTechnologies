const express = require("express");
const {
	handlegetuser,
	handleregisteruser,
	handlepostlogin,
} = require("../controllers/user");
const userRouter = express.Router();

userRouter.get("/", handlegetuser);
userRouter.post("/register", handleregisteruser);
userRouter.post("/login", handlepostlogin);

module.exports = userRouter;
