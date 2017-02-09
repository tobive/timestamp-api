var express = require('express')
var app = express()
var moment = require('moment')

app.get('/:id',function(req,res){
  console.log(new Date(), req.method, req.url);
  var objDate = {"unix": null, "natural": null}
  //if(err) throw err
  if((/^-?[0-9]+$/).test(req.params.id)){ //req in UNIX time
    console.log("req.params.id unix time")
    objDate.unix = parseInt(req.params.id)
    objDate.natural = moment(parseInt(req.params.id)).format("MMMM DD, YYYY")
  } else {
    console.log("req.params.id natural language")
    if(moment(req.params.id).isValid()){
      objDate.unix = parseInt(moment(req.params.id).format("X"))
      objDate.natural = moment(req.params.id).format("MMMM DD, YYYY")
    }
  }
  res.send(objDate)
  
})

//process.env.PORT is the one used in heroku
app.listen(process.env.PORT||8080, function () {
  console.log('timestamp microservice is listening on port!')
})