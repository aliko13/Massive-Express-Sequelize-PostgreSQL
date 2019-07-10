
// Important note: Massive version 3 library doesn't support raw sql queries. 
// For this functionalities Massive 2 library imported 

var express = require('express')
var app = express();

var Massive=require("massive");

// connect to the postgres with connectSyncmethod
var db = Massive.connectSync({
  connectionString: 'postgres://username:password@localhost:5432/pgguide'
});

/* Part 2 */

//Hackable version 
app.get('/products', function (req, res) {
  db.run(`select * from products where title='${req.query.name}'`, function(err, data){
    res.send(data);
  })
})

/* Part 3 */

//Parametertised version
app.get('/products', function (req, res) {
  db.run(`select * from products where title=$1`, [req.query.name], function(err, data){
    res.send(data);
  })
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})