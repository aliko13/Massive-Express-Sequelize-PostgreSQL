// important note that massive v3 library is used

const express = require('express');
const http = require('http');
const massive = require('massive');

// For this functionalities massive 3 libraries supported

const app = express();

massive({
  host: '127.0.0.1',
  port: 5432,
  database: 'pgguide',
  user: 'username',
  password: 'password'
}).then(instance => {

 app.set('db', instance);

 /* Part 1 */

  // get all the users descending order by created_at time
 app.get('/users', (req, res) => {
    req.app.get('db').products.find({order:[{field: 'created_at', direction: 'desc'}]}).then(items => {
      res.json(items);
    });
  });

  // get the document about specific user by specifying ID
 app.get('/users/:id', (req, res) => {
    var id = req.params.id;
    req.app.get('db').users.find({id:id}).then(items => {
      res.json(items);
    });
  });

 // get all the products
 app.get('/products', (req, res) => {
    req.app.get('db').products.find({}).then(items => {
      res.json(items);
    });
  });

  // get the document about specific product by specifying ID
  app.get('/products/:id', (req, res) => {
    var id = req.params.id;
    req.app.get('db').products.find({id:id}).then(items => {
      res.json(items);
    });
  });

   // get all the purchases
  app.get('/purchases', (req, res) => {
    req.app.get('db').purchases.find({}).then(items => {
      res.json(items);
    });
  });
  
  /* Part 3- stored procedure*/
  // get the document about specific product by specifying title_name
  app.get('/products/:name', (req, res) => {
    var name = req.params.name;
    req.app.get('db').products.find({title:name}).then(items => {
      res.json(items);
    });
  });
 
 // run the application in port 3000
 app.listen(3000, function () {
   console.log('Example app listening on port 3000!')
 })

});




