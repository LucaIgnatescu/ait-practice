import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

import url from "url";
import path from "path";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "public")));

const classrooms = [
  { name: "WWH 109", available: true },
  { name: "WWH 201", available: true },
  { name: "WWH 317", available: true },
];
io.on("connection", (sock) => {
  // TODO: complete the body of this callback funddction!
  sock.emit("connection", classrooms);

  sock.on("booked", (name) => {
    console.log(name);
    classrooms.forEach((classroom) => {
      if (classroom.name === name) {
        classroom.available = false;
      }
    });
    io.emit("update", classrooms);
  });
});
server.listen(3000);
