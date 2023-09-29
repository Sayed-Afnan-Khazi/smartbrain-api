const handleGetProfile = (req,res,db)=>{
	const { id } = req.params;
	db.select('*').from('users').where('id',id)
	.then(user=>{
		// Because it returns an empty array if no users are found.
		if (user.length) {
			res.status(200).json(user[0]);
		} else {
			res.status(404).json('Not Found');
		}
	})
	.catch(err=>res.status(400).json('Error fetching user.'));
}

module.exports = {
	handleGetProfile: handleGetProfile
}