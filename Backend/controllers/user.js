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
};
