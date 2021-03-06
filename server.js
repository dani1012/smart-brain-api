const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    
    client: 'pg',
    connection: {
    host : 'postgresql-dimensional-17124',
    user : '',  
    password : '',
    database : 'smart-brain'
  }
});

const app = express();

app.use(bodyParser.json());                      //     to access req.body
app.use(cors());


app.get('/', (req,res)=>{res.send('Hello')})

app.post('/signin',(req, res) => {signin.handleSignin(req,res,db,bcrypt)})

app.post('/register',(req, res) => {register.handleRegister(req,res,db,bcrypt)})
	
app.get('/profile/:id',(req, res) => {profile.handleProfileGet(req,res,db)})
 
app.put('/image', (req, res) => {image.handleImage(req,res,db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req,res)})


app.listen(process.env.PORT || 3000,()=>{
	console.log(`app is running on ${process.env.PORT}`)
})

