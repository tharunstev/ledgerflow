const express=require("express")
const app=express();
const dotenv=require('dotenv')
const mongoose=require('mongoose')


const transactionRoute=require('./routes/transaction.route')
const userRoute=require('./routes/user.route')

const Port=5000;

dotenv.config()



// ----------------------------ROUTES----------------------------------

app.use('/api',transactionRoute)
app.use('/user',userRoute)

app.get('/',(req,res)=>{
    res.send(`<html><body>
        <h1>WELCOME TO LEDGERFLOW</h1>
        <h2>Transaction Management </h2>
        <h3>1. POST /api/transactions/ : this is to make a transaction </h3>
          <p>userid-1 :673dca323c0e47d2f8cb2705 </p>
        <p>userid-2 :673df08bf7b3073a1ff06fec </p>
        <h3>2. GET /api/transactions/user_id : this is for all transactions of a user</h3>
        <p>userid-1 :673dca323c0e47d2f8cb2705 </p>
        <p>userid-2 :673df08bf7b3073a1ff06fec </p>
        <h3>4. GET /api/transaction/transaction-id/  : this is for a particular transaction </h3>
        <p>transactionid-1 : 673f161cc3ecfcdd245892f5</p>
        <p>transactionid-2 : 6740382d8fe73b7e21b15a1a</p>
        <h3>3. PUT /api/updatetransaction/transaction-id/ : to update status of a particular transaction </h3>
       <p>transactionid-1 : 673f161cc3ecfcdd245892f5</p>
        <p>transactionid-2 : 6740382d8fe73b7e21b15a1a</p>
        </body></html>`)
    
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

