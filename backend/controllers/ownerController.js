import ownerService from '../services/ownerService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.SECRET_KEY || 'fallback-secret';

class OwnerController {
    static async admin(req,res) {
        const { email, password }=req.body
        try {
            const owner = await ownerService.admin({ email });
            if (!owner) {
                return { success: false, message: "Owner not found" };
            }

            if (!password || !owner.password) {
                return { success: false, message: "Password missing or not stored correctly" };
            }

            const isMatch = await bcrypt.compare(password, owner.password);
            if (!isMatch) {
                return { success: false, message: "Invalid credentials" };
            }

            const payload = { id: owner._id, email: owner.email};
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "3m" });

            return res.json({ success: true, message: "Login successful", token, owner: payload })
        } catch (error) {
            console.error("Error in admin login:", error.message);
            return res.send(403).json({ success: false, message: error.message });
        }
    }
}

export default OwnerController;
