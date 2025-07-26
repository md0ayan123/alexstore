import ownerService from '../services/ownerService.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

class OwnerController {
 static async admin({ email, password }) {
    try {
        // console.log(" Incoming credentials:", { email, password });

        const owner = await ownerService.admin({ email });
        if (!owner) {
            console.log(" Owner not found");
            return {
                success: false,
                message: "Owner not found"
            };
        }

        // console.log(" Owner found:", owner);

        if (!password || !owner.password) {
            // console.log(" Missing password data", { password, ownerPassword: owner.password });
            return {
                success: false,
                message: "Password missing or not stored correctly"
            };
        }

        const isMatch = await bcrypt.compare(password, owner.password);

        if (!isMatch) {
            return {
                success: false,
                message: "Invalid credentials"
            };
        }

        const payload = {
            id: owner._id,
            email: owner.email
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

        return {
            success: true,
            message: "Login successful",
            token,
            owner: payload
        };
    } catch (error) {
        console.error(" Error in admin login:", error.message);
        return {
            success: false,
            message: error.message
        };
    }
}

}

export default  OwnerController;
