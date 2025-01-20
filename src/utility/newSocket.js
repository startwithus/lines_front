// newSocket.js
import { io } from "socket.io-client";

const URL = process.env.REACT_APP_NEW_BACKEND_SOCKET_URL_GAME;

export const createSocket = (token, gameId) => {
  return io(URL, {
    transports: ["websocket"],
    query: {
      game_id: gameId,
      token,
    },
  });
};
