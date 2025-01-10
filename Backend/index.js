const express = require("express");
const { connecttoMongoDB } = require("./connection/connection");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

connecttoMongoDB("mongodb://127.0.0.1:27017/BanaoDatabase");

app.use("/", userRouter);

app.listen(PORT, (req, res) => {
	console.log(`server is running on port ${PORT}`);
});
