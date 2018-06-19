const express=require("express");
const hbs= require("hbs");
const fs= require('fs');
var app= express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/bootsrap'));

app.use((req,res,next)=>{
	var now=new Date().toString();
	var log= `${now}: ${req.method} ${req.url}`;
	fs.appendFile('server.log',log + '\n', (err)=>{
		if(err){
			console.log('Unable to append');
		}
	});
	console.log(log);
	next();
});
app.use((req,res,next)=>{
	//app.get('/maintenance',(req,res)=>{
	/*res.send("<h1>Hello Express!</h1>");*/
	res.render("maintenance.hbs",{
		maintenance: "maintenance"
	});
//});
	//next();
});



app.get('/',(req,res)=>{
	/*res.send("<h1>Hello Express!</h1>");*/
	res.render("home.hbs",{
		Welcome: "Hello World!"
	});
});
app.get('/about',(req,res)=>{
	res.render('about.hbs');
});
app.get('/bad',(req,res)=>{
	res.send({
		status: 404,
		errorMessage: "Error"
	});
});
app.listen(2000, ()=>{
	console.log("Server will run on port 2000");
});