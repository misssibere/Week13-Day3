require('dotenv').config();
const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const Vegetable = require('./models/Vegetable');


app.use(express.urlencoded({extended: true}));

app.set('view engine' , 'jsx' );
app.engine('jsx', require('express-react-views').createEngine());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:true,
    UseUnifiedTopology: true
})
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
})



///Index
///Vegetable Index

app.get('/vegetables' , (req, res) =>{
    //res.send(vegetables);
    Vegetable.find({}).then((allVegetables) =>{
        console.log(allVegetables);
        res.render('Index' , {vegetables:allVegetables});

    })
    .catch(error =>{
        console.log(error);
    })
});


///New
///Vegetable New

app.get('/vegetables/new' , (req, res) => {
    res.render('New')
})


/// Create
///Vegetable Create

app.post('/vegetables', (req,res) => {
    //res.send('received');

    if(req.body.readyToEat ==='on'){
        req.body.readyToEat = true;
    }
    else{
        req.body.readyToEat =false;
    }
    // vegetables.push(req.body);
    // res.redirect('/vegetables');


    // Vegetable.create(req.body).then((error,createVegetable)=>{
    //     if(error){
    //         console.log(error)
    //     }else{
    //         res.send(createVegetable);
    //     }
    // })
      
    Vegetable.create(req.body).then((createVegetable) =>
    {
        //res.send(createVegetable)
        res.redirect('/vegetables')
    }).catch(error => console.error(error))
});



///Show
///Vegetable Show


app.get('/vegetables/:id' , (req,res) => {
    //res.send(vegetables[req.params.index]);
    Vegetable.findOne({_id: req.params.id}).then((foundVegetable) =>{
       // res.send(foundVegetable)
       res.render('Show' , {
        vegetable: foundVegetable
       })
    }).catch(error =>{
        console.error(error)
    })
})




app.listen(3000, () => {
    console.log("Listening on port 3000");
})