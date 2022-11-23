const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const csv = require('csvtojson')
const port = 3000
const bodyParser = require('body-parser');
const fs = require('fs');
const xmlj = require('xml2js')

var parser = new xmlj.Parser();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router)

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

router.get('/',function(req,res){
  fs.readFile('Cars.json', 'utf8', function (err, data) {
    if (err) throw err;
    var obj = JSON.parse(data);
    console.log(obj)
    res.render('index', {cars: obj});
  });
});

router.get('/xml',function(req,res){
  fs.readFile('Cars.xml', 'utf8', function (err, data) {
    if (err) throw err;
    parser.parseString(data, function (err, result) {
      var obj = result.root.row
      res.render('indexxml', {cars: obj});
    });
  });
});

router.get('/csv',function(req,res){
  csv()
  .fromFile('Cars.csv')
  .then((jsonObj)=>{
    console.log(jsonObj)
    res.render('indexcsv', {cars: jsonObj});
  })  
});

app.listen(port, function() {
  console.log('server connected')
})