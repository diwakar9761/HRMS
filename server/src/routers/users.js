const express = require('express');
const router = new express.Router();
const User = require('../models/users')

// creating new user
router.post('/createUser', async (req, res)=>{    
    const user = new User(req.body);
    try{
        await user.save()
        res.status(201).send({data : user, message: 'User Created Successfully!'})
    }
    catch(error){
        res.status(400).send(error)
    }
})


router.post('/login', async(req, res)=>{
    User.findOne({email : req.body.email}, function(error, user){
        console.log(user);
        
        if(!user){
            res.status(400).send({
                message: 'Email Not Found'
            }) 
        }else{
            if(user.password !== req.body.password){
                res.status(400).send({
                    message: 'Password Not Matched'
                }) 
            }
            else{
                res.status(200).send({
                    data : user,
                    message : 'Login Successfully'
                })
            }
        }
        
    })
})

module.exports = router