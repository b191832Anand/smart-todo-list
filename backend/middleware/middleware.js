import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const middleware=async (req,res,next)=>{
    try{
          const token=req.headers['x-token'];
          if(!token)return res.status(400).send("token not found")
          const val=jwt.verify(token,process.env.KEY)
          req.user=val;
          next();
    }
    catch(e){
         res.status(400).send("error fetching token")
    }
}

export default middleware