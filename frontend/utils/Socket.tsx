import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from "react";
import { Socket, io } from "socket.io-client";

const SocketContext = createContext<Socket>({} as Socket);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const socket = useMemo(() => io(), []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
