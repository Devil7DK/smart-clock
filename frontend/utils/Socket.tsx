import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from "react";
import { Socket, io } from "socket.io-client";
import { SocketEmitEvents } from "../../types";

const SocketContext = createContext<Socket<SocketEmitEvents>>({} as Socket);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const socket = useMemo<Socket<SocketEmitEvents>>(() => io(), []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
