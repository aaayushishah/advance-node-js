import express, { Response, Request } from "express";
import { createServer } from "node:http";
import path from "node:path";
import { Server } from "socket.io";
const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(express.static(path.resolve("./public")));

// Socket request
io.on("connection", (socket) => {
  console.log("newuser:", socket.id);
  socket.on("user-message", (message) => {
    console.log("message: ", message);
    io.emit("server-message", message);
  });
});

app.get("/", (req: Request, res: Response) => {
  return res.sendFile("./public/index.html");
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
