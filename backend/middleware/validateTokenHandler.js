const firebaseAdmin = require('../config/firebaseAdmin')

const validateToken = async(req,res,next) => {

  try {
    
    const bearerToken = req.headers.Authorization || req.headers.authorization;
    if(!bearerToken) {
      return res.status(401).json({message: "No token provided"});
    }
    const token = bearerToken.split(' ')[1];
    const decodedToken =  await firebaseAdmin.admin.auth().verifyIdToken(token);

    if(!decodedToken){
      res.json({message: "User is not authorized"})
    }else{
      req.user = decodedToken
      next();
    }
  } catch (error) {
    res.status(401).json({message: "Invalid or expired token"});
  }
  
}

module.exports = validateToken