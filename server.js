
var express = require('express')
,   app = express()
,   jade = require('jade')
,   parser = require('body-parser')
,   exec = require('child_process').execFile;

var versions = {
  previous:null,
  current:null
};

var router = express.Router();

app.use(parser.urlencoded({extended:true}));

router
  .get('/',function (req, res){
    res.render('index.jade');
  })
  .post('/update',function (req, res){
    console.log('hello',req.body);
    exec("./update.sh", function (error, stdout, stderr) { 
      console.log('processing: ', error);
    });
    res.send({msg:'ok'})
  })

app.use('/', router)

app.listen(5555, function (){
  console.log('listening on port fivefivefivefive');
})