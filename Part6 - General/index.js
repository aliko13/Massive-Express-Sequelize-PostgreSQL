var express = require('express')
var app = express();

var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://ali:aliko1993@localhost/pgguide');

const models = require("./models");

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));


// get all rows
app.get('/products', function(req, res) {
  models.product.findAll({}).then(function(d) {
    res.json(d);
  });
});

// get product by specifying ID
app.get('/products/:id', function(req, res) {
  models.product.find({
    where: {
      id: req.params.id
    }
  }).then(function(d) {
    res.json(d);
  });
});

// create new instance POST
app.post('/products', function(req, res) {
  models.product.create({   
    "title" : "Enterprise",
    "price" : 10.99,
    "created_at" : "2011-01-01T20:00:00.000Z",
    "deleted_at" : null,
    "tags": Array['{"Book","Science"}']
  }).then(function(d) {
    res.json(d);
  });
});

// update product by specifying ID
app.put('/products/:id', function(req, res) {
  models.product.find({
    where: {
      id: req.params.id
    }
  }).then(function(resp) {
    if(resp){
      resp.updateAttributes({
       "title" : "Enterprise_Applications",
        "price" : 10.99,
        "created_at" : "2011-01-01T20:00:00.000Z",
        "deleted_at" : null,
        "tags": Array['{"Book","Science"}']

      }).then(function(d) {
        res.send(d);
      });
    }
  });
});

// delete a single product
app.delete('/products/:id', function(req, res) {
  models.product.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(d) {
    res.json(d);
  });
});

// raw sql querying by specifying string in the url e.g. /endpoint?name=string
app.get('/products', function (req, res) {
  sequelize.query(`select * from products where title='${req.query.name}'`).then(data => {
    res.json(data);
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
