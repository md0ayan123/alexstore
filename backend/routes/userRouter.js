const express = require("express")
const router = express.Router()
const registerModel = require('../models/register-model')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')


router.post('/register', async function(req, res) {
    let { fullName, email, password } = req.body
    try {
        let data = await registerModel.findOne({ email })
        if (data) {
          return  res.status(400).json({
                success: false,
                message: "You already have a account, please login",

            })
        }
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = await registerModel.create({
                fullName,
                email,
                password: hashedPassword
            });
            const token = jwt.sign(
                { user: { id: user._id } },
                process.env.SECRET_KEY,
                { expiresIn: '1h' } // optional, token expiry
            );
            res.cookie("token", token, { httpOnly: true });

            return res.status(200).json({
                success: true,
                message: "User created successfully",
                token, // you can send token here too
                result: user
            });
            } catch (error) {
                console.error("Registration error:", error);
                return res.status(500).json({
                    success: false,
                    message: "Internal server error"
                });
            }

})


router.post('/signup', async function (req, res) {
    let { email, password } = req.body;

    try {
        let user = await registerModel.findOne({ email });
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                console.error("Bcrypt compare error:", err);
                return res.status(500).json({
                    success: false,
                    message: "Internal server error"
                });
            }

            if (result) {
                const token = jwt.sign(
                    { user: { id: user._id } },
                    process.env.SECRET_KEY,
                    { expiresIn: '1h' }
                );
                res.cookie("token", token, { httpOnly: true });

                return res.status(200).json({
                    success: true,
                    message: "Login successfully",
                    result: result
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials"
                });
            }
        });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

module.exports = router;