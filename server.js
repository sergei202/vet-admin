const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Setup Express
const app = express();
app.use(express.static('./public'));
app.use(bodyParser.urlencoded());

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('Vet Admin listening on port '+PORT);


// Setup Mongoose
mongoose.connect('mongodb://vet-admin:admin1@ds147905.mlab.com:47905/okcoders-vet', {useNewUrlParser:true});

const Pet = mongoose.model('Pet', {
	name: String,
	type: String,
	age: Number,
	owner: {type:mongoose.Schema.Types.ObjectId, ref:'Owner'}
});
const Owner = mongoose.model('Owner', {
	name: String,
	phone: String,
	email: String
});



function addPet(pet) {
	pet = new Pet(pet);
	console.log('addPet: %j', pet);
	return pet.save();
}
function getPets() {
	return Pet.find().populate('owner').exec();
}

function addOwner(owner) {
	owner = new Owner(owner);
	console.log('addOwner: %j', owner);
	return owner.save();
}
function getOwners() {
	return Owner.find().exec();
}

app.post('/pet', (req,res) => {
	addPet(req.body).then(pet => res.json(pet));
});
app.get('/pets', (req,res) => {
	getPets().then(pets => res.json(pets));
});

app.post('/owner', (req,res) => {
	addOwner(req.body).then(owner => res.json(owner));
});
app.get('/owners', (req,res) => {
	getOwners().then(owners => res.json(owners));
});
