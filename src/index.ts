//imports
import express from 'express';
import cors from 'cors';
import { db } from './database/db';
const app = express();

//configs
app.use(cors({credentials: true, origin: "http://localhost:3000"}))
app.use(express.json());

//routes
const UserRoutes = require("./routes/UserRoutes");
app.use("/users", UserRoutes)

db.sync().then(() => {
    app.listen(5000)
}).catch((error: any) => console.log(error));