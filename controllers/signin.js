const handleSignin = (db, bcrypt) => (req, res) => {
	
	let { email, password } = req.body;

	if (email && password) {

		db("login")
		.where("email", email)
		.then(user => {

			if (user[0]) {
				let isValid = bcrypt.compareSync(password, user[0].hash);

				isValid
				? db("users")
				.where("email", user[0].email)
				.then(loggedInUser => res.json(loggedInUser[0]))
				.catch(err => {
					res.status(400).json(false);
				})
				: res.status(400).json(false);
			} else {
				res.status(400).json(false);
			}
		});
	} else {
		res.json(false);
	}
};

module.exports = {
	handleSignin
}