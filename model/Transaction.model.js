const mongoose=require('mongoose')

const transactionSchema=mongoose.Schema({
    amount:{type:Number,required:true},
    transactiontype:{type:String,enum:['DEPOSIT','WITHDRAW'],required:true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    status:{type:String,
        enum:['PENDING','COMPLETED','FAILED'],
        default:'PENDING'},
    timestamp:{type:Date,default:Date.now}
});

module.exports=mongoose.model('Transaction',transactionSchema);
