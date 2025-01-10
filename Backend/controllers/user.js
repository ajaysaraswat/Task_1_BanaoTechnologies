const crypto = require("crypto");
require("dotenv").config();
const nodemailer = require("nodemailer");
const User = require("../models/user");

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
		const { email } = req.body;

		// Find the user by email
		const user = await User.findOne({ email });
		console.log("user", user);
		if (!user) {
			return res.status(404).json({ message: "Email not found" });
		}

		// Generate a reset token and expiration
		const resetToken = crypto.randomBytes(32).toString("hex");

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
		await user.save();

		// Configure the email transporter
		const transporter = nodemailer.createTransport({
			service: "Gmail",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		const resetURL = `http://${req.headers.host}/reset-password/${resetToken}`;

		const mailOptions = {
			to: user.email,
			from: process.env.EMAIL_USER,
			subject: "Password Reset Request",
			text: `You are receiving this because you (or someone else) have requested a password reset.\n\n
Please click on the following link, or paste it into your browser to complete the process:\n\n
${resetURL}\n\n
If you did not request this, please ignore this email and your password will remain unchanged.\n`,
		};

		// Send the email
		await transporter.sendMail(mailOptions);

		res
			.status(200)
			.json({ message: "Password reset email sent successfully." });
	} catch (error) {
		console.error("Error in forgot password handler:", error);
		res.status(500).json({ message: "An error occurred. Please try again." });
	}
};

const handleregisteruser = async (req, res) => {
	try {
		const body = req.body;
		if (!body) return res.status(400).send({ message: "invalid body" });
		await User.create({
			fullname: body.fullname,
			email: body.email,
			password: body.password,
		});
		console.log("user created");
		return res.redirect("/login");
	} catch (err) {
		return res.redirect("/register");
	}
};

const handlepostlogin = (req, res) => {
	try {
		const { email, password } = req.body;
		const uid = User.matchPasswordAndGenerateToken(email, password);
		res.cookie("uid", uid);
		return res.redirect("/");
	} catch (err) {
		return res.redirect("/register", {
			message: "invalid username and password",
		});
	}
};

module.exports = {
	handlegetuser,
	handleregisteruser,
	handlepostlogin,
	handlegetregisteruser,
	handlegetlogin,
	handlegetforgotpassword,
	handlepostforgotpassword,
};
