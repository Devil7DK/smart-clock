import { faLink, faLinkSlash } from "@fortawesome/free-solid-svg-icons";
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

  return <FontAwesomeIcon icon={connected ? faLink : faLinkSlash} />;
};
