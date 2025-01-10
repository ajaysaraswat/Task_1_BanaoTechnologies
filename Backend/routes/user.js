const express = require("express");
const { handlegetuser, handlepostuser } = require("../controllers/user");
const userRouter = express.Router();

userRouter.get("/", handlegetuser);
userRouter.post("/post", handlepostuser);

module.exports = userRouter;
