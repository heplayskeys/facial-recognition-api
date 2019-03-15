const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const app = express();

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = require("knex")({
	client: "pg",
  	connection: {
	    host: "127.0.0.1",
	    user: "postgres",
	    password: "123",
	    database: "facial_recognition"
 	}
});

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.use(express.static(`${__dirname}/public`));

// Landing Home
app.get("/", (req, res) => {
	res.json("Behold the face-detecting Magical Brain!");
});

// User Sign In
app.post("/signin", signin.handleSignin(db, bcrypt));

// Register New User
app.post("/register", register.handleRegister(db, bcrypt));

// Render User Profile
app.get("/profile/:id", profile.renderProfile(db));

// Update Entry Count
app.put("/image", image.updateEntries(db));
app.post("/imageurl", image.handleApiCall);

app.get("*", (req, res) => {
	res.json("404: Page Not Found");
});

app.listen(PORT, () => {
	console.log(`App listening on port: ${PORT}`);
});