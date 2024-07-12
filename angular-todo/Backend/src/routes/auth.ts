import express from "express"
import { Request, Response } from "express"
import fs from "fs"
import path from "path"
import jwt from "jsonwebtoken"
import { CustomRequestVerify, verifyJWT } from "../middlewares/verifyJWT"

interface User{
    id:string,
    username:string,
    password : string
}

const router = express.Router()

const filePath = path.join(__dirname, './db.json');

router.post("/signin", (req: Request, res: Response) => {
    const { username, password } = req.body;

    const body = {
        id: Math.floor(Math.random() * 10000000000000),
        username,
        password
    };

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message }); 
            return; 
        }

        const users = JSON.parse(data);
        const userFound = users.find((user: any) => user.username === username);

        if (userFound) {
            res.status(400).json("User already exists!");
            return; 
        }

     
        users.push(body);

       
        fs.writeFile(filePath, JSON.stringify(users), (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Error while writing data!" }); 
                return; 
            }

            res.status(200).json("Signin Successful!"); 
        });
    });
});



router.get("/", verifyJWT, (req : CustomRequestVerify, res : Response) => {
    const user = req?.user as string
    try{
        res.status(200).json(user);
    }catch(err){
        res.status(400).send(err);
    }
})


router.post("/login", (req : Request, res: Response) => {
    const {username,password} = req.body;

    try{
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return res.status(500).send("Internal Server Error");
            }

            const users: User[] = JSON.parse(data);
            const userFound = users.find((user) => {
                return user.username === username;
            });

            if(!userFound) {
                return res.status(400).send("User Not Found!");  
            }

            if (userFound) {
                  if(userFound.password !== password){
                    return res.status(400).send("Password mismatch!")
                }
            }

            const token : string = jwt.sign({username}, "se3ret");
            return res.status(200).send({token, message : "Login Successful!"});
        });

    }catch(err){
        res.status(400).send(err)
    }
})


export default router;