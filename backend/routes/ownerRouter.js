const express = require("express")
const ownerModel = require("../models/owner-model")
const router = express.Router()
const bcrypt = require("bcrypt");

router.post("/login", async function (req, res) {
    let { email, password } = req.body;

    console.log(req.body);
    
    try {
        const owner = await ownerModel.findOne({ email });

        console.log(owner);
        if (!owner) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }

        const isMatch = await bcrypt.compare(password, owner.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

     
        return res.status(200).json({
            success: true,
            message: "Login successfully"
          
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

module.exports = router