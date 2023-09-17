import express from "express";
import { existsSync } from "fs";
import { createServer } from "http";
import { resolve } from "path";
import { setupSocket } from "./Socket";

const app = express();

const httpServer = createServer(app);

setupSocket(httpServer);

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
