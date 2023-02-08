import express from "express";
import { createServer } from "http";
import user from "./routers/user.router";
import message from "./routers/message.router";
import mongoose from "mongoose";
import _ from "lodash";
import listEndpoints from "express-list-endpoints";
import socketManager from "./socketManager";

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 5000;

const databaseUrl = "mongodb+srv://ZrEqDkEqlf:WGfpHdhNOl@cluster0.fjiti.mongodb.net/main?retryWrites=true&w=majority";

mongoose.connect(databaseUrl, {}, (err: unknown) => {
    if (!err) {
        console.log("Connection to the database succeeded");
    } else {
        console.log("Error in connection to database: " + err);
    }
});

//Start socket.io

socketManager(httpServer);

httpServer.listen(port);

app.use(express.json());

app.use("/user", user);

app.use("/message", message);

app.route("/").get((req, res) => {
    res.send(listEndpoints(app));
});
