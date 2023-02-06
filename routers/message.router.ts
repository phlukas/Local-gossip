import express from "express";
import { Message } from "../models/message.model";

const router = express.Router();

router.get("/:chatRoomId", (req, res) => {
    Message.find({ chatRoomId: req.params.chatRoomId }, (err, result) => {
        res.send(result);
    });
});

export default router;
