const jwt = require('jsonwebtoken');
const employ=require('../models/employe');

//get user role by id
const getUserRole=require('./getUserRole')

module.exports=async  function protect(req, res, next) {
    const userId = req.headers['userid'];

    if (!userId) {
        return res.status(401).json({ message: "User ID is required" });
    }

    //`fetch the user role based on userId
    const userRole = await getUserRole(userId);

    if (!userRole) {
        return res.status(401).json({ message: "Invalid user ID" });
    }

    // Middleware for authorization based on user role
    if (userRole === "DEVELOPER") {
        if (
            req.method === "GET" &&
            (
                req.url === `/api/employe/profile/${userId}` ||
                req.url === `/api/employe/myProject/${userId}`
            )
        ) {
            next();} else {
            res.status(403).json({ message: "Access denied" });
        }

    } else if (userRole === "PROJECT-MANAGER") {
        if (req.url.startsWith("/api/project") || req.url.startsWith("/api/employe/update") || (req.url.startsWith("/api/employe") && req.method==="GET") )
        {
            next();

        } else {
            res.status(403).json({ message: "Access denied" });
        }
    } else if (userRole === "HR") {
        if (req.url.startsWith("/api/employe")) {
                next();
        } else {
            res.status(403).json({ message: "Access denied" });
        }
    }
}