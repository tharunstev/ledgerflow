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
    res.send("Welcome to LedgerFlow
LedgerFlow is your go-to platform for seamless transaction management. Whether you're handling deposits, withdrawals, or simply keeping track of your financial activities, LedgerFlow provides an intuitive and efficient way to manage all your transactions.

Key features of LedgerFlow include:

Create Transactions: Effortlessly create new transactions, including deposits and withdrawals, specifying the amount, type, and associated user.
Transaction History: Quickly access and view the transaction history for any user, with detailed information such as transaction type, amount, status, and timestamp.
Update Transaction Status: Update the status of any transaction, marking it as Completed or Failed, to keep your records accurate and up-to-date.
Detailed Transaction View: Get a comprehensive look at any individual transaction, including all relevant details such as transaction ID, amount, type, status, and timestamp.")
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

