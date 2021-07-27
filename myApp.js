var express = require('express');
var app = express();

absolutePath = __dirname + "/views/index.html";

app.use(express.urlencoded({extended: false}));

app.use("", function(req, res, next){
  console.log(req.method+ " " + req.path + " - " + req.ip);
  next();
})

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.sendFile(absolutePath);
});

app.get('/now', function (req, res, next){
  const currentTime = new Date().toString();
  req.time = currentTime;
  next();
},
  function(req, res){
    res.json({time: req.time});
  }
);

app.post('/name', (req, res)=>{
  res.json({name: req.body.first + " " + req.body.last})
})

app.get('/:word/echo', (req, res)=>{
    res.json({echo:req.params.word})
})

app.get('/name', (req, res)=>{
  res.json({name: req.query.first + " " + req.query.last})
})


app.get("/json", function(req, res){
  if(process.env.MESSAGE_STYLE==="uppercase"){
    res.json({"message": "HELLO JSON"});
  }else{
    res.json({"message": "Hello json"})
  };
});


module.exports = app;
