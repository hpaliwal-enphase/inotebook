const jwt = require('jsonwebtoken');
const JWT_SECRET = 'hellohit@nsh';

const fetchUser = (req, res, next) => {
    //Get the user from the JWT token and add its id to request object
    const token = req.header('auth-token') //kept header name as auth-token
    if(!token){
        res.status(401).send({
            error: "Please authenticate using valid token."
        });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({
            error: "Please authenticate using valid token."
        });
    }
    
}


module.exports = fetchUser;