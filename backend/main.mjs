import api from "./routes/api.mjs";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import corsConfig from "./configs/cors.mjs";
import http from "http";
import "dotenv/config";
import { Server } from "socket.io";

var app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer,{
  cors: {
    origin: '*',
  }
});

middlewares();

io.on("connection", (socket) => {
  console.log("A user connected");
});


start();
routes();

function middlewares() {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors(corsConfig));
}

function start() {
  httpServer.listen(process.env.PORT || 5000, () =>
    console.log("El servidor webhook esta escuchando!")
  );
}

function routes() {
  app.use("/", api);
}
export default io