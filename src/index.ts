//imports
import express from 'express';
import cors from 'cors';
import { db } from './database/db';

//tabelas
import { Release } from './models/Release';
import { UserList } from './models/UserList';

const app = express();
const port = process.env.PORT || 5000;

//configs
app.use(cors())
app.use(express.json());

//routes
const UserRoutes = require("./routes/UserRoutes");
const ReleaseRoutes = require("./routes/ReleaseRoutes");
const UserListRoutes = require("./routes/UserListRoutes");
const NotificationRoutes = require("./routes/NotificationsRoutes");

app.use("/users", UserRoutes);
app.use("/releases", ReleaseRoutes);
app.use("/userlist", UserListRoutes);
app.use("/usernotifications", NotificationRoutes);

// {force: true}
db.sync().then(() => {
    app.listen(port)
}).catch((error: any) => console.log(error));