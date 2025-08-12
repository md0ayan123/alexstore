import express from 'express'
const router = express.Router();
import UserController from'../controllers/userController.js'

// REGISTER
router.post('/register', async (req, res) => {
    const result = await UserController.register(req.body);
    res.status(result.success ? 200 : 400).json(result);
});

// SIGNUP
router.post('/signin', async (req, res) => {
    const result = await UserController.signin(req.body)
     res.status(result.success ? 200 : 400).json(result);
});
// listed user
router.get('/listed', UserController.listed)

router.get('/:id', UserController.single)

export default router;
