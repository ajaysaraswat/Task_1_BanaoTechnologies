const express = require("express");
const { connecttoMongoDB } = require("./connection/connection");
const userRouter = require("./routes/user");
const { checkForAuthenticationCookie } = require("./middlewares/auth");
const path = require("path");
const cookieParsar = require("cookie-parser");
const app = express();
const PORT = 3000;

connecttoMongoDB("mongodb://127.0.0.1:27017/BanaoDatabase");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParsar());
app.use(checkForAuthenticationCookie("uid"));

app.use("/", userRouter);

app.use(express.static("./views"));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.listen(PORT, (req, res) => {
	console.log(`server is running on port ${PORT}`);
});
