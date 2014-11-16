
var express = require('express')
,   app = express()
,   jade = require('jade')
,   parser = require('body-parser')
,   exec = require('child_process').execFile
,   router = express.Router();

var repo = 'captainhook';

app.use(parser.urlencoded({extended:true}));
app.use(parser.json());

router
  .get('/',function (req, res){
    res.render('index.jade');
  })
  .post('/update',function (req, res){
    var rObj = req.body.repository;
    if(rObj.name == repo){
      // push has come from the right place
      exec("./update.sh", function (error, stdout, stderr) { console.log('processing: ', error, stdout, stderr); });
      res.send({msg:'ok'});
    } else {
      res.send({msg:'fail'});
    }
    res.end();
  })

app.use('/', router);

app.listen(5555, function (){
  console.log('listening on port fivefivefivefive');
})