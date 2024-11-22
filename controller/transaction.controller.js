const Transaction=require('../model/Transaction.model')
const User=require('../model/User.model')

const createTransaction=async(req,res)=>{
    try {
        const {amount,transactiontype,user}=req.body;
        if(!amount){
           return res.status(400).json({message:"Amount is missing or invalid"})
        }

        if(!transactiontype){
          return res.status(400).json({message:"Transcation-type is missing or invalid"})
        }

        const onlyValidTypes=['DEPOSIT','WITHDRAW']
        if(!onlyValidTypes.includes(transactiontype)){
            return res.status(400).json({message:`transcation-type is invalid , valid types are : ${onlyValidTypes}`})
        }

        const userByID=await User.findById(user)
        
        if(!userByID){
          return  res.status(404).json({message:"User not found"})
        }

        const transaction=new Transaction({amount,transactiontype,user:userByID._id})

        await transaction.save();
        const formattedTransaction = {
            transaction_id: transaction._id,  
            amount: transaction.amount,
            transaction_type: transaction.transactiontype, 
            user:transaction.user,
            status: transaction.status,
            timestamp: transaction.timestamp, 
        };
        console.log(formattedTransaction);
        
        res.status(201).json(formattedTransaction);


    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"})
        
        
    }
}


const getAllTransactionsOfUser=async(req,res)=>{
    try {
        const id=req.params.id;

        const userData = await User.findById(id); 
        console.log(userData);
        
        if(!userData){
            return res.status(404).json({message:"user not found"})
        }
        
        const allTransactions=await Transaction.find({user:userData._id});
        if(!allTransactions){
            return res.status(404).json({message:"This user haven't made any transaction till now"})
        }
        const transactionFormat=allTransactions.map(transaction=>({
            transaction_id: transaction._id,  
            amount: transaction.amount,
            transaction_type: transaction.transactiontype, 
            status: transaction.status,
            timestamp: transaction.timestamp, 
    }));
        console.log(transactionFormat);
        res.status(200).json(transactionFormat);
        
        
    } catch (error) { 
        console.log(error);
        res.status(500).json({message:"internal server error"})
        
    }
}


const getTransactionById=async(req,res)=>{
    try {
        const id=req.params.id;
        if(!id){
            return res.status(400).json({message:" id is missing or invalid "})
        }
        const transaction=await Transaction.findById({_id:id});

        if(!transaction){
            return res.status(404).json({message:"Transcation not exist"})
        }
        const transactionFormat = {
            transaction_id: transaction._id,  
            amount: transaction.amount,
            transaction_type: transaction.transactiontype, 
            status: transaction.status,
            timestamp: transaction.timestamp, 
        };

        res.status(200).json(transactionFormat);

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"})
        
    }
}


const updateTransaction=async(req,res)=>{
    try {
        const id=req.params.id;
        const {status}=req.body;

        if(!status){
            return res.status(400).json({message:"Status is missing or invalid or not in correct format"})
        }

        const onlyValidStatus=["COMPLETED","FAILED"]
        if(!onlyValidStatus.includes(status)){
            return res.status(400).json({message:`Status type is invalid , valid types arre : ${onlyValidStatus}`})
        }

        const transaction=await Transaction.findById({_id:id})
        if(!transaction){
            return res.status(400).json({message:"Transcation not exist"})
        }
        
        transaction.status=status ;
        await transaction.save();
        const transactionFormat = {
            transaction_id: transaction._id,  
            amount: transaction.amount,
            transaction_type: transaction.transactiontype, 
            status: transaction.status,
            timestamp: transaction.timestamp, 
        };

        res.status(200).json(transactionFormat);


    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }
}

module.exports={createTransaction,getAllTransactionsOfUser,getTransactionById,updateTransaction};
