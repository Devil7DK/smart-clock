import {
  faLink,
  faLinkSlash,
  faMemory,
  faMicrochip,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

import { useSocket } from "../../utils";

export const SocketConnection: React.FC = () => {
  const socket = useSocket();

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket]);

  return (
    <span className="status-icon">
      <FontAwesomeIcon icon={connected ? faLink : faLinkSlash} />
    </span>
  );
};

export const Usage = () => {
  const socket = useSocket();

  const [usage, setUsage] = useState<{ cpu: number; memory: number }>();

  useEffect(() => {
    const onUsage = (value: typeof usage) => {
      setUsage(value);
    };

    socket.on("usage", onUsage);

    return () => {
      socket.off("usage", onUsage);
    };
  }, [socket]);

  return usage ? (
    <>
      <span className="status-icon">
        <FontAwesomeIcon icon={faMemory} />
        {usage?.memory}%
      </span>
      <span className="status-icon">
        <FontAwesomeIcon icon={faMicrochip} />
        {usage?.cpu}%
      </span>
    </>
  ) : null;
};
