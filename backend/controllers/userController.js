import userService  from '../services/userService.js'; // ✅ renamed to match usage
import bcrypt  from 'bcrypt'
import jwt  from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const JWT_SECRET = process.env.SECRET_KEY

class UserController {
    static async register({ fullName, email, password }) {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = await userService.register({
                fullName,
                email,
                password: hashedPassword
            });

            const payload = {
                id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName
            };

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

            return {
                success: true,
                message: 'User registered successfully',
                token,
                user: payload
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }

    static async signup({ email, password }) {
        try {
            const user = await userService.signup({ email });
            if (!user) {
                return {
                    success: false,
                    message: 'User not found'
                };
            }

            const isMatch = bcrypt.compare(password, user.password);
            if (!isMatch) {
                return {
                    success: false,
                    message: 'Invalid credentials'
                };
            }

            const payload = {
                id: user._id,
                email: user.email,
                fullName: user.fullName
            };

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

            return {
                success: true,
                message: 'Login successful',
                token,
                user: payload
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
}

export default UserController;
