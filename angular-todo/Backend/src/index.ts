import express from "express"
import { Request, Response } from "express";
import usersRouter from "./routes/auth"
import cors from "cors"


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors())

app.use("/auth", usersRouter)

app.get('/', (req : Request, res : Response) => {
    res.json("Backend Connected!")
})


app.listen(PORT, () => {
    console.log(`server is listening to port http://localhost:${PORT}`)
})