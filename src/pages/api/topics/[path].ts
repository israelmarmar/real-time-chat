import authMiddleware from "@/middleware/authMiddleware";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4, validate as isValidUUID } from "uuid";
import { initSocket } from "../socket";

const topics: any = [];
const subscribers: any = {};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const resp = res as any;

  console.log("path", req.query.path, req.user);

  if (req.method === "POST" && req.query.path === "notifications") {
    console.log(req.body);
    const { topicId, content } = req.body;
    const io = initSocket(res.socket.server);

    const tpcs = subscribers[req.user.id];
    const currTopic = tpcs?.filter((t) => t.id === topicId);

    const creatorId = topics.filter((t) => t.id === req.body.topicId)[0]
      ?.creator?.id;

    if (currTopic?.length === 1 || creatorId === req.user.id) {
      io.sockets.emit(
        "notify-topicId-" + topicId,
        JSON.stringify({ uuid: uuidv4(), username: req.user.email, content })
      );
      return res.status(200).json({ msg: "OK" });
    } else return res.status(401).send("Usuário não inscrito");
  }

  if (req.method === "GET" && isValidUUID(req.query.path)) {
    const title = topics.filter((t) => t.id === req.query.path)[0]?.title;
    return res.status(200).json({ title });
  }

  if (req.method === "GET" && req.query.path === "all") {
    const topicIds = subscribers[req.user.id]?.map((s) => s.id) || [];
    return res
      .status(200)
      .json(
        topics.filter(
          (t) => t.creator?.id !== req.user.id && !topicIds.includes(t.id)
        )
      );
  }

  if (req.method === "GET" && req.query.path === "me") {
    return res
      .status(200)
      .json(topics.filter((t) => t.creator.id === req.user.id));
  }

  if (req.method === "GET" && req.query.path === "subscribes") {
    return res.status(200).json(subscribers[req.user.id] || []);
  }

  if (req.method === "POST" && req.query.path === "subscribe") {
    const title = topics.filter((t) => t.id === req.body.topicId)[0]?.title;
    subscribers[req.user.id] = [
      ...(subscribers[req.user.id] || []),
      { id: req.body.topicId, title },
    ];
    return res.status(200).json({ msg: "ok" });
  }

  if (req.method === "POST" && req.query.path === "create") {
    const { title } = req.body;
    const data = { id: uuidv4(), title, creator: req.user };
    topics.push(data);
    return res.status(200).json(data);
  }

  return res.status(405).json({ message: "Método não permitido" });
}

export default authMiddleware(handler);
