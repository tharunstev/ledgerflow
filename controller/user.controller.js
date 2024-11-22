const User=require('../model/User.model')

const createUser=async(req,res)=>{
    try {
        const {name,email}=req.body;

        if(!name){
            res.status(404).json({message:"name is missing "})
        }
        if(!email){
            res.status(404).json({message:"email is missing "})
        }

        const user=new User({name,email})
        await user.save();
        res.status(201).json(user)

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }
}

module.exports={createUser};
