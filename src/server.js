const express=require('express');
const app = express();
const hbs=require('hbs');
hbs.registerPartials('C:/Users/Saira/expressjs/views/partials')
app.set('view engine','hbs');
app.get('/',(req,res)=>res.render('index.hbs'))
app.use(express.static('C:/Users/Saira/expressjs/public'));
app.get('/weather',(req,res)=>{
    res.render('weather');
})
app.get('*',(req,res)=>{
    res.render('404');
})
app.listen(8000,()=>{
    console.log('server is running on port 8000');
})