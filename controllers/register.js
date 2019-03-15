const handleRegister = (db, bcrypt) => (req, res) => {

	let { name, email, password } = req.body;

	if (name && email && password) {

		let hash = bcrypt.hashSync(password);

		db.transaction(trx => {
			trx.insert({
				hash,
				email
			})
			.into("login")
			.returning("email")
			.then(loginEmail => {
				trx("users")
				.returning("*")
				.insert({
					name,
					email: loginEmail[0],
					joined: new Date()
				})
				.then(user => res.json(user[0]))
				.then(trx.commit)
				.catch(err => {
					trx.rollback;
					res.status(400).json(false);
				});
			});
		});
	} else {
		res.json(false);
	}
}

module.exports = {
	handleRegister
};