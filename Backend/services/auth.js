const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "$banaotech123";

const setuser = (user) => {
	const payload = {
		email: user.email,
		_id: user._id,
	};
	return jwt.sign(payload, JWT_SECRET_KEY);
};

const getuser = (token) => {
	if (!token) return null;
	try {
		return jwt.verify(token, JWT_SECRET_KEY);
	} catch {
		return null;
	}
};

module.exports = {
	setuser,
	getuser,
};
