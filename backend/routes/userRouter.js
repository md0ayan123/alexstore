import express from 'express'
const router = express.Router();
import UserController from'../controllers/userController.js'

// REGISTER
router.post('/register', async (req, res) => {
    const result = await UserController.register(req.body);
    res.status(result.success ? 200 : 400).json(result);
});

// SIGNUP
router.post('/signup', async (req, res) => {
    const result = await UserController.signup(req.body)
     res.status(result.success ? 200 : 400).json(result);
});

export default router;
