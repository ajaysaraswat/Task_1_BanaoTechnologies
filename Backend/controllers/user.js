const User = require("../models/user");

const handlegetuser = (req, res) => {
	return res.status(200).send({ message: "successful get" });
};

const handlepostuser = (req, res) => {
	try {
		const body = req.body;
		if (!body) return res.status(400).send({ message: "invalid body" });
		User.create({
			fullname: body.fullname,
			email: body.email,
			password: body.password,
		});
		console.log("user created");
	} catch (err) {
		throw console.error("Error", err);
	}
};

module.exports = {
	handlegetuser,
	handlepostuser,
};
