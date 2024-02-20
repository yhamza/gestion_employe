const employ = require("../models/employe");

module.exports=async function getUserRole(userId) {
    try {
        const user = await employ.findById(userId);
        if (user) {
            return(user.role);
        } else {
            console.log("error to find user")
            return null;
        }
    } catch (err) {
        console.log("Error finding user role:", err);
    }

}