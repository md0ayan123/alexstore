// const path=require('path')
    import express from "express"
    import productsRouter from './routes/productsRouter.js'
    import ownerRouter from "./routes/ownerRouter.js"
    import userRouter from'./routes/userRouter.js'
    import orderRouter from './routes/orderRouter.js'
    import paymentRouter from './routes/payment.js'
    import dashboardRouter from './routes/dashboardRouter.js'
    import db from './config/db.connection.js'
    const app = express();
    const port = process.env.PORT || 5000;

    import cors from 'cors'

    app.use(cors());


    // middlewares
    app.use(express.json({ limit:"20mb" }));
    // app.use(express.static(path.join(__dirname,'public')))

    // route included
    app.use("/payment", paymentRouter);
    app.use("/products",productsRouter)
    app.use("/owner",ownerRouter)
    app.use("/user",userRouter)
    app.use("/order",orderRouter)
    app.use('/admin',dashboardRouter)

    app.listen(port, () => console.log(`server started on port ${port}`));