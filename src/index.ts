//imports
import express from 'express';
import cors from 'cors';
import { db } from './database/db';

const app = express();
const port = process.env.PORT || 3000;

//configs
app.use(cors())
app.use(express.json());

//routes
const UserRoutes = require("./routes/UserRoutes");
app.use("/users", UserRoutes)

db.sync().then(() => {
    app.listen(port)
}).catch((error: any) => console.log(error));