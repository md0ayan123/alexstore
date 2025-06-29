const jwt = require("jsonwebtoken");

const isLoggin = (req, res, next) => {
    try {
        const token = req.header("auth-token");

        if (!token) {
            return res.status(401).send({ error: "Please authenticate using a valid token" });
        }

        const data = jwt.verify(token, process.env.SECRET_KEY);
        req.user = data.user;
        
        console.log("Decoded token data:", data);
        
        next();
    } catch (error) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

module.exports = isLoggin;

