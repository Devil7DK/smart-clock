import { Server as HTTPServer } from "http";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import * as sysinfo from "systeminformation";

import { SocketEmitEvents } from "../types";

export async function setupSocket(server: HTTPServer): Promise<void> {
  const io = new Server<DefaultEventsMap, SocketEmitEvents>(server);

  io.on("connection", (socket) => {
    console.log("A user connected");
  });

  setInterval(async () => {
    const load = await sysinfo.currentLoad();
    const mem = await sysinfo.mem();
    const temp = await sysinfo.cpuTemperature();

    const cpuPercentage = load.currentLoad;
    const memoryPercentage = (mem.used / mem.total) * 100;
    const cpuTemperature = temp.main;

    io.emit("usage", {
      cpu: Number(cpuPercentage).toFixed(2),
      memory: Math.round(memoryPercentage),
      temp: Math.round(cpuTemperature),
    });
  }, 1000);
}
