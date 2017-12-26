const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app= express();
var port=process.env.PORT || 3000;
hbs.registerPartials(__dirname+'/views/partials')

app.set('view engine','hbs');



app.use((req,res,next)=>{
    var now= new Date().toString();
    var log=`${now}: ${req.method}  ${req.url}`
    console.log(log);
    fs.appendFileSync('server.log', log +'\n');
    
    next();
})

// app.use((req,res,next)=>{
//     res.render('maintainance.hbs');
// });

hbs.registerHelper('getCurrentYear', ()=>{
return new Date().getFullYear();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('screamIt',(text)=>{
return text.toUpperCase();
});
app.get('/',(req,res)=>{
//res.send("<h1>Hello Express!</h1>");
    res.send({
        name: 'Harshit',
        likes:[
            'travelling',
            'riding'
        ]
    });
});
app.get('/home', (req, res)=>{
    res.render('home.hbs',{
        welcomeMessage:'welcome to my page',
        pageTitle:'Home Page',

    });
});


app.get('/about', (req, res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
    });
});

app.get('/bad', (req, res)=>{
    res.send({
        errormessage: "Unable to connect to the server"
    });
});

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});