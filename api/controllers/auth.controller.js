
import User from '../models/user.model.js'

import bcryptjs from 'bcryptjs'



export const signup=async (req,res)=>{

///


const {userName,email,password}=req.body

const hashPassword= bcryptjs.hashSync(password,10)

const newUser=new User({
    userName,email,password:hashPassword
})
try {
    await newUser.save()
res.status(200).json({message:"User save successfully"})
} catch (error) {
    res.status(500).json({msg:error.message})
}

}