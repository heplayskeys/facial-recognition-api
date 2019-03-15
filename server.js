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
	    connectionString: process.env.DATABASE_URL,
	    ssl: true
 	}
});

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

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