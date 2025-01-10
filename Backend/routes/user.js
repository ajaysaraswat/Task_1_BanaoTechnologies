const express = require("express");
const { handlegetuser, handlepostuser } = require("../controllers/user");
const userRouter = express.Router();

userRouter.use("/", handlegetuser);
userRouter.use("/post", handlepostuser);

module.exports = userRouter;
