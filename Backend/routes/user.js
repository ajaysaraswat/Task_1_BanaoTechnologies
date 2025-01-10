const express = require("express");
const {
	handlegetuser,
	handleregisteruser,
	handlepostlogin,
	handlegetregisteruser,
	handlegetlogin,
	handlegetforgotpassword,
	handlepostforgotpassword,
	handlepostsetpass,
	handlelogout,
} = require("../controllers/user");
const userRouter = express.Router();
// const Token = require("../models/token");
// const User = require("../models/user");
// const crypto = require("crypto");
// const Joi = require("joi");
// const sendEmail = require("../services/sendEmail");

userRouter.get("/", handlegetuser);
userRouter.post("/register", handleregisteruser);
userRouter.post("/login", handlepostlogin);
userRouter.get("/register", handlegetregisteruser);
userRouter.get("/login", handlegetlogin);
userRouter.get("/forgot-password", handlegetforgotpassword);
userRouter.post("/", handlepostforgotpassword);
userRouter.post("/:userId/:token", handlepostsetpass);
userRouter.get("/logout", handlelogout);

// userRouter.post("/", async (req, res) => {
// 	try {
// 		const schema = Joi.object({ email: Joi.string().email().required() });
// 		const { error } = schema.validate(req.body);
// 		if (error) return res.status(400).send(error.details[0].message);

// 		const user = await User.findOne({ email: req.body.email });
// 		console.log("user", user);
// 		if (!user)
// 			return res.status(400).send("user with given email doesn't exist");

// 		let token = await Token.findOne({ userId: user._id });
// 		if (!token) {
// 			token = await new Token({
// 				userId: user._id,
// 				token: crypto.randomBytes(32).toString("hex"),
// 			}).save();
// 		}

// 		const link = `${process.env.BASE_URL}/${user._id}/${token.token}`;
// 		console.log("link", link);
// 		await sendEmail(user.email, "Password reset", link);

// 		res.send("password reset link sent to your email account");
// 	} catch (error) {
// 		res.send("An error occured");
// 		console.log("error in try cache", error);
// 	}
// });

// userRouter.post("/:userId/:token", async (req, res) => {
// 	try {
// 		const schema = Joi.object({ password: Joi.string().required() });
// 		const { error } = schema.validate(req.body);
// 		if (error) return res.status(400).send(error.details[0].message);

// 		const user = await User.findById(req.params.userId);
// 		if (!user) return res.status(400).send("invalid link or expired");

// 		const token = await Token.findOne({
// 			userId: user._id,
// 			token: req.params.token,
// 		});
// 		if (!token) return res.status(400).send("Invalid link or expired");

// 		user.password = req.body.password;
// 		await user.save();

// 		res.send("password reset sucessfully.");
// 	} catch (error) {
// 		res.send("An error occured");
// 		console.log(error);
// 	}
// });

userRouter.get("/:userId/:token", (req, res) => {
	return res.render("newPasswordPage", {
		userId: req.params.userId,
		token: req.params.token,
	});
});

module.exports = userRouter;
