const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');



const app = express();
const port = process.env.PORT || 3000 ;

//paths for express config
const viewsPath = path.join(__dirname, "../templates/views");
const publicDirPath =path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/partials");


//handelbar setup
app.set('view engine','hbs');  //set hbs as views engine 
app.set('views',viewsPath);  //customize name to templates and set it 
hbs.registerPartials(partialsPath);

//static dir to serve
app.use(express.static(publicDirPath));  //set static resource/public folder



app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather App',
        myName: 'Wina'
    });
});

 
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        myName: 'Wina'
    });
});


app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        message: 'This is the help page',
        myName: 'Wina'
    })
});
app.get("/help/*",(req,res)=>{
    res.render('pageNotFound',{
        title: '404',
        message: 'Help Page not found',
        myName: 'Wina'
    });
})

app.get('/weather',(req,res)=>{
    address = req.query.address;
    if(!address){
        return res.send({
            error: 'you need to provide an address'
        })
    }
    geocode(address,(error, {latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error , responseObj)=>{
            if(error){
                return res.send({error})
            }
           res.send({
               responseObj,location
            })
        })
    });
});


 


app.get('/product',(req,res)=>{
    console.log(req.query.somthing);
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        product:[]
    })
})


app.get("*",(req,res)=>{
    // res.send("My 404 page");
    res.render('pageNotFound',{
        title: '404 ',
        message: 'Page Not Found',
        myName: 'Wina'
    })
});

app.listen(port,()=>{
    console.log("server up on port "+port);
});


