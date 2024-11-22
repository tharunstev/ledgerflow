const express=require('express')
const router=express.Router();
const {createTransaction, getAllTransactionsOfUser, getTransactionById, updateTransaction}=require('../controller/transaction.controller');

router.post('/transactions',createTransaction)
router.get('/transactions/:id',getAllTransactionsOfUser)
router.get('/transaction/:id',getTransactionById)
router.put('/updatetransaction/:id',updateTransaction)

module.exports=router;

