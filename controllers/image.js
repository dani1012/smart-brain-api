const Clarifai = require('clarifai');

//You have to add your own API key from Clarifai
const app = new Clarifai.App({
 apiKey: 'e1477ca77afc434d9c60d04f78a73adc'
});

const handleApiCall = (req, res) => {
 app.models
  .predict(
     "a403429f2ddf4b49b307e318f00e528b",   
     req.body.input)   //it is a trap ,should use input here instead of imageURL
  .then(data => {
  	res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with API'))
}


const handleImage = (req,res,db)=>{

    const {id} = req.body; 
    db('users').where({id})
      .increment('entries',1)            //increment of entries
      .returning('entries')
      .then(entries => {
        res.json(entries[0]);   
      })
      .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}