
const handleRegister = (req,res,db,bcrypt) => { 
	const {name,email,password} = req.body;
    if(!name||!email||!password) {
        return res.status(400).json('incorrect form submission')
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx=> {
        trx.insert({
        hash: hash,
        email: email
    })
     .into('login')
     .returning('email')
     .then(loginEmail => {
       return db('users')
         .insert({            //insert new user into table users and retrun all the columns
           name :  name,
           email : loginEmail[0],          
           joined : new Date() 
         })
         .returning('*') 
	     .then(user =>{
            res.json(user[0])     //response will be an object array [{ id...,name...}], but we only want object
         })
     })
     .then(trx.commit)
     .catch(trx.rollback)
    })
      .catch(err => res.status(400).json('unable to register!'))

 }


 module.exports = {
    handleRegister: handleRegister
 }