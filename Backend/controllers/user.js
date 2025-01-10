const User = require("../models/user");

const handlegetuser = (req, res) => {
	return res.status(200).send({ message: "successful get" });
};

const handlepostuser = async (req, res) => {
	try {
		const body = req.body;
		if (!body) return res.status(400).send({ message: "invalid body" });
		await User.create({
			fullname: body.fullname,
			email: body.email,
			password: body.password,
		});
		console.log("user created");
		return res.status(201).json({ message: "user created" });
	} catch (err) {
		throw console.error("Error", err);
	}
};

module.exports = {
	handlegetuser,
	handlepostuser,
};
