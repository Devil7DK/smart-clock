import { SocketPayloadUsage } from "./SocketPayloads";

export interface SocketEmitEvents {
  usage: (payload: SocketPayloadUsage) => void;
}
