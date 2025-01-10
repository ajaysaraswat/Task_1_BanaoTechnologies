const handlegetuser = (req, res) => {
	return res.status(200).send({ message: "successful get" });
};

const handlepostuser = (req, res) => {};

module.exports = {
	handlegetuser,
	handlepostuser,
};
