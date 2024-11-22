const express=require("express")
const app=express();
const bodyParser=require('body-parser')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const path=require('path');

const transactionRoute=require('./routes/transaction.route')
const userRoute=require('./routes/user.route')

const Port=5000;

dotenv.config()
app.set('view ejs','ejs');
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());


// ----------------------------ROUTES----------------------------------

app.use('/api',transactionRoute)
app.use('/user',userRoute)
app.get('/',(req,res)=>{
    res.send("ledgerflow")
})

// --------------------------------------------------------------



mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('DB connected succesfully');
    
})
.catch((error)=>{
    console.log(error);
    
})

app.listen(Port,()=>{
    try {
        console.log("listening to port : 5000");
        
    } catch (error) {
        console.log(error);
        
    }
})

