const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/Geocode')
const forcast = require('./utils/Forcast')
// Creating the app.
const app = express() 

// Define the path of the app.
const viewpath = path.join(__dirname ,'../Templets/views')
const publicpath = path.join(__dirname,'../public')
const paritalpath = path.join(__dirname,'../Templets/partials')


// Setting view engine and views.
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(paritalpath)


// Telling where the static file.
app.use(express.static(publicpath))



app.get('',(req,res) => {
    res.render('index',{title:'Weather',name:'Tanu kumar'})
})

app.get('/about' , (req,res) =>{
    res.render('about',{title:'About' , name:'Tanu Kumar'})
})

app.get('/help',(req,res) =>{
    res.render('help',{title:'Help' , name:'Tanu Kumar'})
})
app.get('/weather' , (req,res)=>{
    if(!req.query.address){
        return res.send({error:'please provide addresss'})
    }
    geocode(req.query.address , (error,{Latitude,Longtitude,Location}=[])=>{
            if(error){
                return res.send({error:error})
            }
            forcast(Latitude,Longtitude,(error,message)=>{
                if(error){
                    return res.send({error:error})
                }
                return res.send({address:Location,forcast:message})
            })

    })
})
app.get('/help/*', (req,res) => {
    res.render('error' , {message:'help not exists',name:'Tanu Kumar'})
})

app.get('*',(req,res)=>{
    res.render('error',{message:'page not found',name:'Tanu Kumar'})
})


// running the server at port number 
app.listen(3000,()=>{
    console.log('Connected to server at port 3000')
})