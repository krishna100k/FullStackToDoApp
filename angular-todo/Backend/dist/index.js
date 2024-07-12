"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use("/user", users_1.default);
app.get('/', (req, res) => {
    res.json("Backend Connected!");
});
app.listen(PORT, () => {
    console.log(`server is listening to port http://localhost:${PORT}`);
});
