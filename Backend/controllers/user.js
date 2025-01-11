const crypto = require("crypto");
require("dotenv").config();
const nodemailer = require("nodemailer");
const User = require("../models/user");
const Token = require("../models/token");
const Joi = require("joi");
const sendEmail = require("../services/sendEmail");

const handlegetuser = (req, res) => {
	return res.render("home");
};

const handlegetregisteruser = (req, res) => {
	return res.render("register");
};

const handlegetlogin = (req, res) => {
	return res.render("login");
};

const handlegetforgotpassword = (req, res) => {
	return res.render("forgotpass");
};

const handlepostforgotpassword = async (req, res) => {
	try {
		const schema = Joi.object({ email: Joi.string().email().required() });
		const { error } = schema.validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const user = await User.findOne({ email: req.body.email });
		console.log("user", user);
		if (!user)
			return res.status(400).send("user with given email doesn't exist");

		let token = await Token.findOne({ userId: user._id });
		if (!token) {
			token = await new Token({
				userId: user._id,
				token: crypto.randomBytes(32).toString("hex"),
			}).save();
		}

		const link = `${process.env.BASE_URL}/${user._id}/${token.token}`;
		await sendEmail(user.email, "Password reset", link);

		res.status(200).json({
			status: "Success",
			message: "password reset link sent to your email account",
		});
	} catch (error) {
		res.send("An error occured");
	}
};
const handlepostsetpass = async (req, res) => {
	try {
		const schema = Joi.object({ password: Joi.string().required() });
		const { error } = schema.validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const user = await User.findById(req.params.userId);
		if (!user) return res.status(400).send("invalid link or expired");

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send("Invalid link or expired");

		user.password = req.body.password;
		await user.save();

		return res.status(200).json({ message: "password reset sucessfully." });
	} catch (error) {
		res.send("An error occured");
		console.log(error);
	}
};

const handleregisteruser = async (req, res) => {
	try {
		const body = req.body;
		if (!body) return res.status(400).send({ message: "invalid body" });
		const user = await User.create({
			fullname: body.fullname,
			email: body.email,
			password: body.password,
		});

		return res
			.status(201)
			.json({ status: "Created Successfully", message: user._id });
	} catch (err) {
		return res.redirect("/register");
	}
};

const handlepostlogin = (req, res) => {
	try {
		const { email, password } = req.body;
		const uid = User.matchPasswordAndGenerateToken(email, password);
		res.cookie("uid", uid);
		return res.status(200).json({
			status: "Login sucessfully",
			message: "Jwt authentication",
		});
	} catch (err) {
		return res.status(200).json({
			status: "some problem...",
			message: console.log(err),
		});
	}
};
const handlelogout = (req, res) => {
	res.clearCookie("uid").status(200).json({ status: "Logout success" });
};

module.exports = {
	handlegetuser,
	handleregisteruser,
	handlepostlogin,
	handlegetregisteruser,
	handlegetlogin,
	handlegetforgotpassword,
	handlepostforgotpassword,
	handlepostsetpass,
	handlelogout,
};
