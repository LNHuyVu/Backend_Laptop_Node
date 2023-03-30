const jwt = require("jsonwebtoken");

const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        // console.log("JWT-----------------------------:",process.env.JWT_ACCESS_KEY)
        // console.log("ERR-----------------------------:",err)
        // console.log("User----------------------------:",user)
        if (err) {
          return res.status(403).json("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You're not authenticated");
    }
  },

  verifyTokenAndAdminAuth:(req,res, next)=>{
    middlewareController.verifyToken(req,res,()=>{
        if(req.user.id==req.body.id || req.user.roles=="T1")
        {
            next();
        }else{
            return res.status(403).json("You're not allowed to delete other");
        }
    })
  }
};
module.exports = middlewareController;
