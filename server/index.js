require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes/vacation-route");
const userRouter = require("./routes/user-route");
const errorMiddleware = require("./middlewares/error-middleware");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static("static"));
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.use("/api", router);
app.use("/api", userRouter);
app.use(errorMiddleware);

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			writeConcern: { w: 'majority' },
		});
		app.listen(PORT, () =>
			console.log(`server is running on ${PORT} PORT`)
		);
	} catch (e) {
		console.log(e);
	}
};
start();
