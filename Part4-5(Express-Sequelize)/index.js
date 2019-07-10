var express = require('express')
var app = express();

var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://ali:aliko1993@localhost:5432/pgguide');

const models = require("./models");

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

// create tables
// Company

models.sequelize.sync()
	.then(() => models.Provider.destroy({
		where: {}
  }))

// Populate model
models.sequelize.sync()
	.then(() => models.Provider.bulkCreate([
		{provider_id: 1, name: 'Google', address: 'Dublin4'},
		{provider_id: 2, name: 'Microsift', address: 'Dublin18'}
	]))

app.get('/provider', function(req,res){
	models.Provider.findAll({}).then(function(d){
		res.json(d);
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})	