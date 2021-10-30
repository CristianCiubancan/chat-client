// import { useIdleTimer } from "react-idle-timer";
import { useApolloClient } from "@apollo/client";
import { useEffect } from "react";
import { activeSocket } from "./wsLink";

export const ReloadOnIdle = (setState: any = null) => {
  const client = useApolloClient();

  const handleOnIdle = async () => {
    if (setState) {
      await setState(true);
    }
    const sock = activeSocket;

    if (document.hidden) {
      if (sock) await sock.close(1000, "normal closure");
    }

    if (!document.hidden) {
      if (sock && sock.readyState !== WebSocket.OPEN) {
        await client.reFetchObservableQueries();
      }

      if (sock && sock.readyState === WebSocket.CLOSED) {
        await sock.close(4205, "Client Restart");
        await client.reFetchObservableQueries();
      }
    }
    if (setState) {
      await setState(false);
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleOnIdle);
    return () => {
      document.removeEventListener("visibilitychange", handleOnIdle);
    };
  }, []);
};
