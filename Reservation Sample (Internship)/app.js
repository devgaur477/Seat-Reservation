const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose')

const app = express();



app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
mongoose.connect("mongodb://localhost:27017/newDB", {useNewUrlParser: true , useUnifiedTopology: true} );
mongoose.set("useCreateIndex", true);

const userSchema = {
    name: String,
    p_number : Number,
    email : String , 
    password : String,
    guests : Number
};

const User =  mongoose.model("User", userSchema);


app.get("/" , function(req , res){
    res.render('home');
})

app.get("/login" , function(req , res){
    res.render('login');
})

app.get("/register" , function(req , res){
    res.render("register")
})



app.get("/logout" , function(req , res){
    res.render('Home')
})

app.post("/login" , function(req , res){
    const username = req.body.username;
    const password = req.body.password;
    var guests = req.body.numberofguests;

    User.findOne({email : username} , function(err , foundUser){
        if(err){
            console.log("Sorry! Not Found");
        }
        else {
            if(foundUser){
                if(foundUser.password===password){
                    
                    
                    res.render("registeration")
                }
                
                
            }
            else if(!foundUser){
                res.render("home")
            }
        }
    })
})


app.post("/register" , function(req , res){

    const user = new User({
        name : req.body.fullname , 
        p_number : req.body.contactnumber , 
        email : req.body.username , 
        password : req.body.password ,
        guests : req.body.numberofguests
    });

    user.save(function(err){
        if(!err){
            res.render("succesfulregistered")
        }
        else {
            console.log("Error")
        }
    })
})


app.post("/registeration" , function(req, res){
    res.render('morereg')
})

app.listen(1000 , function(){
    console.log("Server is Up")
})