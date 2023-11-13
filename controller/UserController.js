// const express = require('express');
// const UserLogIn = require('../model/User');
// const router = express.Router();
// const bcrypt = require('bcryptjs')
// constjwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');

// const salt = bcrypt.genSaltSync(10);
// const secret = 'oweubvcev';

// router.post("/signup", async (req,res) =>{
//     const{username,password} =req.body;
//     try{
//         const userDocument =await UserLogIn.create({
//             username,
//             password:bcrypt.hashSync(password,salt)
//         });
//             res.json(userDocument)
//     }catch(e){
//         res.status(400).json(e);
//     }
      
// })

// router.post('/login', async (req,res) =>{
//     const{username,password} = req.body;
//     const userDocument = await UserLogIn.findOne({username});
//     const passOk=bcrypt.compareSync(password, userDocument.password)
//     if (passOk){
//         jwt.sign({username, id:userDocument.id}, secret, {}, (error,token) =>{
//             if(error) throw error;
//             res.cookie('token', token).json('ok');
//         });
//     }else{
//         res.status(400)
//     }
// })

// router.get('/profile', (req,res) => {
//     const{token} =req.cookies;
//     jwt.verify(token,secret, {}, (error,info)=>{
//         if(error) throw error;
//         res.json(info);
//     });
//     res.json(req.cookies);
// })

// router.post('/logout', (req,res) =>{
//     res.cookie('token', '').json('ok');
// })
// module.exports =router;


const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User'); // Assuming you have a User model

const router = express.Router();

// Register a new user
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login and generate a JWT token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    // Fetch user profile based on the userId stored in the JWT token
    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Logout (optional, as it depends on how you implement authentication)
router.post('/logout', (req,res) =>{
  res.cookie('token', '').json('ok');
})

module.exports = router;
