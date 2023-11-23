const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({extended:false}))

app.set('view engine','ejs')

const User = mongoose.model('User',{
    firstName : String,
    lastName : String,
    phone : Number
})  

app.get('/',(req,res)=>{
    res.json({
        message:'Hey yo!'
    })
})

app.get('/users',async (req,res)=>{
    try
    {
        let users = await User.find({})
        res.json({ 
            status: 'SUCCESS',
            data: users
        })
    }catch(error){
        res.json({
            status: 'FAIL',
            message: 'something went wrong' 
        })
    }
})

app.post('/users',async (req,res)=>{
    try
    {
        const { firstName, lastName, phone } = req.body;
        await User.create({firstName, lastName, phone})
        res.json({ 
            status: 'SUCCESS',
            message: 'User created successfully'
        })
    }catch(error){
        res.json({
            status: 'FAIL',
            message: 'something went wrong' 
        })
    }
})

app.patch('/users/:id',async (req,res)=>{
    try
    {
        const { id } = req.params
        const { firstName, lastName, phone } = req.body;
        await User.findByIdAndUpdate(id, {firstName, lastName, phone})
        res.json({ 
            status: 'SUCCESS',
            message: 'User updated successfully'
        })
    }catch(error){
        res.json({
            status: 'FAIL',
            message: 'something went wrong' 
        })
    }
})

app.delete('/users/:id',async (req,res)=>{
    try
    {
        const { id } = req.params
        await User.findByIdAndDelete(id)
        res.json({ 
            status: 'SUCCESS',
            message: 'User deleted successfully'
        })
    }catch(error){
        res.json({
            status: 'FAIL',
            message: 'something went wrong' 
        })
    }
})


app.listen(process.env.PORT,()=>{
    mongoose.connect(process.env.MONGODB_URL)
        .then(()=>console.log(`connection success and server running on http://localhost:${process.env.PORT}`))
        .catch((error)=>console.log('error'))
})