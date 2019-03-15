const renderProfile = (db) => (req, res) => {
	
	let { id } = req.params;

		db("users").where("id", id)
		.then(user => {
			user.length
			? res.json(user[0])
			: res.status(400).json("Invalid user ID. Please try again.");
		})
		.catch(err => res.status(400).json("Invalid user ID. Please try again."));
};

module.exports = {
	renderProfile
}