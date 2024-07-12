import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

export interface CustomRequestVerify extends Request{
    user?: string;
}


export const verifyJWT = (req:CustomRequestVerify, res:Response, next:NextFunction) => {
    const authString = req.headers?.authorization as string;
    const token = authString?.split(" ")[1];
    if(!token) return res.status(400).send("Token not Found!");

    try{
        const verify:any  =  jwt.verify(token, "se3ret") as any;
        req.user = verify

        next();

    }catch(err){
        res.status(400).json({err, message: "Token Not Valid!"})
    }
}