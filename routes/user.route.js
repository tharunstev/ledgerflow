const {createUser}=require('../controller/user.controller')
const express=require('express')
const router=express.Router();

router.post('/add-user',createUser);

module.exports=router;
