const handleProfileGet = (req,res,db) => {

   const {id} = req.params;
   db('users').where({id})         //equals to : db.select('*').from('users').where({id})
      .then(user => {
        if(user.length) {          //it will return empty array if id doesn't exist, use length to validate if an empty array returned 
        res.json(user[0])
    } else {
        res.status(400).json('Not found')
    }
   })
      .catch(err => res.status(400).json('error getting user'))

}

module.exports = {
	handleProfileGet: handleProfileGet
}