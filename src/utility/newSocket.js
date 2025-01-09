// newSocket.js
import { io } from "socket.io-client";

const URL = "https://backend-limbo.maharaj365.in/";

export const createSocket = (token, gameId) => {
  return io(URL, {
    transports: ["websocket"],
    query: {
      game_id: gameId,
      token,
    },
  });
};
