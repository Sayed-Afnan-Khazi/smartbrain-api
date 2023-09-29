const handleSignin = (req,res,db,bcrypt) => {
	if (!req.body.email || !req.body.password) {
		res.status(400).json('Invalid data');
		return;
	}
	db.select('email','hash').from('login')
	.where({email:req.body.email})
	.then(data=>{
		const isValid = bcrypt.compareSync(req.body.password,data[0].hash);
		if (isValid) {
			db.select('*').from('users')
			.where('email','=',data[0].email)
			.then(user=>res.status(200).json(user[0]))
			.catch(err=>res.status(400).json('Invalid Credentials'))
		} else {
			res.status(400).json('Invalid Credentials');
		}
	})
	.catch(err=>res.status(400).json('Invalid Credentials'))
}

module.exports = {
	handleSignin: handleSignin
}