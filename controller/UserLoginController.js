const express = require('express');
const UserLogIn = require('../model/UserLogin');
const router = express.Router();
const bcrypt = require('bcryptjs')
constjwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const salt = bcrypt.genSaltSync(10);
const secret = 'oweubvcev';

router.post("/signup", async (req,res) =>{
    const{username,password} =req.body;
    try{
        const userDocument =await UserLogIn.create({
            username,
            password:bcrypt.hashSync(password,salt)
        });
            res.json(userDocument)
    }catch(e){
        res.status(400).json(e);
    }
      
})

router.post('/login', async (req,res) =>{
    const{username,password} = req.body;
    const userDocument = await UserLogIn.findOne({username});
    const passOk=bcrypt.compareSync(password, userDocument.password)
    if (passOk){
        jwt.sign({username, id:userDocument.id}, secret, {}, (error,token) =>{
            if(error) throw error;
            res.cookie('token', token).json('ok');
        });
    }else{
        res.status(400)
    }
})

router.get('/profile', (req,res) => {
    const{token} =req.cookies;
    jwt.verify(token,secret, {}, (error,info)=>{
        if(error) throw error;
        res.json(info);
    });
    res.json(req.cookies);
})

router.post('/logout', (req,res) =>{
    res.cookie('token', '').json('ok');
})
module.exports =router;