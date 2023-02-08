import { Client, MesssageModel, SearchingModel } from "./types";
import { findPairAsync, printRemainingUsers, sendMessage } from "./utilities";
import { chatRoomEventGroup, messageEvent, userEventGroup } from "./constants";
import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import _ from "lodash";

export default (httpServer: HttpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
        },
    });

    const searchingClients: Client[] = [];

    io.on("connection", (socket: Socket) => {
        console.log(`Socket with ID ${socket.id} connected.`);

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

            console.log(`Socket with ID ${socket.id} disconnected.`);

            printRemainingUsers(searchingClients);
        });
    });
};
