    const express = require("express");
    const path=require('path')
    const productsRouter=require('./routes/productsRouter')
    const ownerRouter=require("./routes/ownerRouter")
    const userRouter=require('./routes/userRouter')
    const db=require('./config/db.connection')
    const app = express();
    const port = process.env.PORT || 5000;

    const cors = require('cors');
    app.use(cors());


    // middlewares
    app.use(express.json({ limit:"20mb" }));
    app.use(express.static(path.join(__dirname,'public')))

    // route included
    app.use("/payment", require("./routes/payment"));
    app.use("/products",productsRouter)
    app.use("/owner",ownerRouter)
    app.use("/user",userRouter)

    app.listen(port, () => console.log(`server started on port ${port}`));