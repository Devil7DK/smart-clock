import express from "express";
import { existsSync } from "fs";
import { createServer } from "http";
import { cpu, mem } from "node-os-utils";
import { resolve } from "path";
import { Server } from "socket.io";

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("A user connected");
});

setInterval(async () => {
  const cpuPercentage = await cpu.usage();
  const memoryPercentage = (await mem.info()).usedMemPercentage;

  io.emit("usage", {
    cpu: Number(cpuPercentage).toFixed(2),
    memory: Math.round(memoryPercentage),
  });
}, 1000);

const publicDir = resolve(process.cwd(), "public");

console.log(`Checking if '${publicDir}' exists...`);

if (existsSync(publicDir)) {
  console.log(`Setting up static with '${publicDir}'`);

  app.use(express.static(publicDir));

  app.get("*", (req, res) => {
    return res.sendFile(publicDir + "/index.html");
  });
}

httpServer.listen(3000, () => {
  console.log("listening on *:3000");
});
