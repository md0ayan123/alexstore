import userService  from '../services/userService.js'; // ✅ renamed to match usage
import bcrypt  from 'bcrypt'
import jwt  from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const JWT_SECRET = process.env.SECRET_KEY

class UserController {
    static async register(req,res) {
        const {fullName, email, password, contact }=req.body
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = await userService.register({
                fullName,
                email,
                contact,
                password: hashedPassword
            });
            if(newUser){
                const payload = {
                    id: newUser._id,
                    email: newUser.email,
                    fullName: newUser.fullName,
                    contact:newUser.contact
                };
    
                const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' });
    
                res.status(200).json({
                    status: true,
                    message: 'User registered successfully',
                    token,
                    user: payload
                });
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }

    static async signin(req,res) {
        const {email,password}=req.body
        try {
            const user = await userService.signin({ email });
            if (!user) {
                 res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            const isMatch =await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid credentials'
                })
            }

            const payload = {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                contact:user.contact
            };

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' });

            res.status(200).json({
                status: true,
                message: 'Login successful',
                token,
                user: payload
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status: false,                                                                                                 
                message: error.message
            });
        }
    }

    static async listed(req,res){
        try {
            const data=await userService.listed()
            res.status(200).json({
                success:true,
                message:"User listed successfully",
                result:data
            })
        } catch (error) {
            res.status(404).json({
                succcess:false,
                message:error.message
            })
        }
    }
    static async single(req,res){
        let{id}=req.params
        try {
            const data=await userService.single(id)
            if(!data){
                res.status(404).json({
                    success:false,
                    message:"user not found"
                })
            }
            res.status(200).json({
                success:true,
                message:"user found successfully",
                result:data
            })
        
        } catch (error) {
            res.status(404).json({
                success:false,
                message:error.message
            })
            
        }
    }


}

export default UserController;
