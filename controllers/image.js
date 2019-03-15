const Clarifai = require("clarifai");

const app = new Clarifai.App({
	apiKey: "cf0226d5c56744bcb239f99088cc55ae"
});

const handleApiCall = (req, res) => {

	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => res.json(data))
	.catch(err => {
		console.log(err);
		res.status(400).json("Whoops! Something went wrong.");
	});
};

const updateEntries = (db) => (req, res) => {

	let { id } = req.body;

	db("users")
	.returning("*")
	.where("id", id)
	.increment("entries", 1)
	.then(user => res.json(user[0]))
	.catch(err => res.status(400).json("Whoops! Something went wrong."));
};

module.exports = {
	updateEntries,
	handleApiCall
}