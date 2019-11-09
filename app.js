const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("Public"));

app.get("/", (req, res)=>{
  res.sendFile(__dirname +"/index.html");
});


app.post("/", (req, res)=>{
var firstName = req.body.fName;
var lastName = req.body.lName;
var email = req.body.email;

var data = {
  members: [
    {
      email_address: email,
      status: "subscribed",
      merg_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};

var jsonData = JSON.stringify(data);

options ={
  url: 'https://us3.api.mailchimp.com/3.0/lists/d60a88f119',
  method: "POST",
  headers: {
    "Authorization": 'Kevin1 c9e43ccc13f342238218ab46cf7159e9-us3'
  },
  body: jsonData
};
// console.log(firstName, lastName, email);
request(options, (error, response, body)=>{
  if(error){
      res.sendFile(__dirname +"/failure.html");
  }else{
    if(response.statusCode ===200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname +"/failure.html");
    }
  }

});


});

app.post("/failure", (req,res)=>{
res.redirect("/");
})

app.post("/success", (req, res)=> {
  res.redirect("/");
})

app.listen(process.env.PORT||3000 , ()=> {
  console.log("Sever is running at 3000");
});


//mailchip ApI:
//c9e43ccc13f342238218ab46cf7159e9-us3

//list ID: d60a88f119
