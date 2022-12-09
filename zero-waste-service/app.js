/**
 * app.js: Entry point for starting the application. It defines all the routes and starts the application on port 3000.
 * It also initialises the app with functionality required for the proper working of the server.
 */

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const http = require("http");
const { verifyTokenForWs } = require("./controllers/authJWT");
const parseCookie = require("./utility/utils");
const Redis = require("ioredis");

const redis = new Redis();

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

const config = require("./config/config");
const routes = require("./routes/index");

const port = config.port;
const mongoUrl = config.mongoUrl;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const httpServer = http.createServer(app);
app.use("/", routes);

httpServer.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log(`Mongo database working on: ${mongoUrl}`);
});

/**
 * Event listener for httpServer for websocket upgrade event 
 * 
 * @param {string} event name of the event for which listener is attached.
 * @param {function} processRequest callback function to handle the websocket connection.
 */
httpServer.on("upgrade", async function (req, socket) {
  var validationResult = await verifyTokenForWs(req.headers.cookie);
  if (!validationResult) {
    socket.write(
      "HTTP/1.1 401 Web Socket Protocol Handshake\r\n" +
        "Upgrade: WebSocket\r\n" +
        "Connection: Upgrade\r\n" +
        "\r\n"
    );
    //  socket.close();
    socket.destroy();
    return;
  }
});
const expressWs = require("express-ws")(app, httpServer);

/**
 * Websocket route to handle bin status change notification.
 * 
 * @param {string} routePath Defines the route path which will trigger this method
 * @param {function} processMessage process the message and subscribe to bin status change for that user
 */
app.ws("/binStatusChange", function (ws, req) {
  const cookieList = parseCookie(req.headers.cookie);
  const userId = cookieList?.["userId"];
  if (userId) {
    redis.subscribe(`bin_status_${userId}`);
    redis.on("message", (channel, message) => {
      if (channel === `bin_status_${userId}`) {
        console.log("sending message to user: ", message);
        ws.send(message);
      }
    });
  }
});

module.exports = app;
