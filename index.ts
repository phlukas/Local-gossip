import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import user from "./routers/user.router";
import message from "./routers/message.router";
import { Client, MesssageModel, SearchingModel } from "./types";
import { findPairAsync, printRemainingUsers, sendMessage } from "./utilities";
import mongoose from "mongoose";
import { chatRoomEventGroup, messageEvent, userEventGroup } from "./constants";
import _ from "lodash";
import listEndpoints from "express-list-endpoints";

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 5000;

const databaseUrl = "mongodb+srv://ZrEqDkEqlf:WGfpHdhNOl@cluster0.fjiti.mongodb.net/main?retryWrites=true&w=majority";

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

mongoose.connect(databaseUrl, {}, (err: unknown) => {
    if (!err) {
        console.log("Connection to the database succeeded");
    } else {
        console.log("Error in connection to database: " + err);
    }
});

const searchingClients: Client[] = [];

io.on("connection", (socket: Socket) => {
    socket.on(userEventGroup, (searchingModel: SearchingModel) => {
        searchingClients.push({
            socket: socket,
            userId: searchingModel.userId,
            radius: searchingModel.kilometers,
        });
        findPairAsync(searchingClients);
    });

    socket.on(chatRoomEventGroup, (messageModel: MesssageModel) => {
        if (messageModel.type === messageEvent) {
            console.log("Gauta zinute:");
            console.log(messageModel);
            sendMessage(messageModel, io);
        }
    });

    const interval = setInterval(function () {
        socket.emit("time", Date.now()); // This will be deleted in the near future because it was only created to test front-end
    }, 5000);

    socket.on("disconnect", () => {
        clearInterval(interval); // This will be deleted in the near future because it was only created to test front-end
        _.remove(searchingClients, (client: Client) => {
            return client.socket === socket;
        });
        printRemainingUsers(searchingClients);
    });
});

httpServer.listen(port);

app.use(express.json());

app.use("/user", user);

app.use("/message", message);

app.route("/").get((req, res) => {
    res.send(listEndpoints(app));
});
