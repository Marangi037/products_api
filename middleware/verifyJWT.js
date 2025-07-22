import jwt from 'jsonwebtoken';

export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(404).send("Auth header missing");
    const accessToken = authHeader && authHeader.split(' ')[1];
    jwt.verify(
        accessToken, 
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err){
                res.status(403).send("Invalid access token");
            }
            req.user = decoded;
        }
    )
    next();
}