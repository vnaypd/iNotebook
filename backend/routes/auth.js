const express = require('express')
const router = express.Router()
const User = require('../models/User')

const { body, validationResult } = require('express-validator')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'BINOY'

var fetchuser = require('../middleware/fetchUser')

router.post('/createuser', [
     body('email', "enter a correct email").isEmail(),
     body('name', "enter a correct name of min 3 char").isLength({ min: 3 }),
     body('password', "enter a correct password").isLength({ min: 8 }),
], async (req, res) => {
     let success = false
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ success, errors: errors.array() })
     }

     try {
          let user = await User.findOne({ email: req.body.email });
          if (user) {
               return res.status(400).json({ success, error: "sorry email already used" })
          }
          const salt = await bcrypt.genSalt(10);
          secPass = await bcrypt.hash(req.body.password, salt)

          user = await User.create({
               name: req.body.name,
               email: req.body.email,
               password: secPass
          })
          const data = {
               user: {
                    id: user.id
               }
          }
          const authtoken = jwt.sign(data, JWT_SECRET)
          success = true
          res.json({ success, authtoken })
     }

     catch (error) {
          console.error(error.message)
          res.status(500).send("some error occured")
     }
})

router.post('/login', [
     body('email', "enter a correct email").isEmail(),
     body('password', "enter a correct password").exists(),
], async (req, res) => {
     let success = false;
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() })
     }

     const { email, password } = req.body;
     try {
          let user = await User.findOne({ email })
          if (!user) {
               success = false
               return res.status(400).json({ error: "please try to login with correct credentials " })
          }

          const passwordCompare = await bcrypt.compare(password, user.password);
          if (!passwordCompare) {
               success = false
               return res.status(400).json({ success, error: "Please try to login with correct credentials" });
          }

          const data = {
               user: {
                    id: user.id
               }
          }
          const authtoken = jwt.sign(data, JWT_SECRET)
          success = true;
          res.json({ success, authtoken })
     }
     catch (error) {
          console.error(error.message)
          res.status(500).send("internal server error:some error occured")
     }
})




router.post('/getuser', fetchuser, async (req, res) => {
     try {
          userId = req.user.id;
          const user = await User.findById(userId).select("-password")
          res.send(user)
     }
     catch (error) {
          console.error(error.message)
          res.status(500).send("internal server error:some error occured")
     }
})



module.exports = router