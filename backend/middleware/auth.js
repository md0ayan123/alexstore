import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SECRET_KEY || 'fallback-secret';

const isLoggin = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            return res.status(401).json({ error: "No token provided" });
        }

        // Expect "Bearer <token>"
        const jwtToken = authHeader.replace("Bearer", "").trim();
        console.log("Token from auth middleware:", jwtToken);

        const decoded = jwt.verify(jwtToken, JWT_SECRET);
        req.user = decoded;

        console.log("Decoded token data:", decoded);
        next();
    } catch (error) {
        console.error("Auth middleware error:", error.message);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

export default isLoggin;

export const isAdmin = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");     
        if (!authHeader) {
            return res.status(401).json({ error: "No token provided" });
        }

        const token = authHeader.replace("Bearer", "").trim();
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};  