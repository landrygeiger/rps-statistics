// index.js

const functions = require("firebase-functions");
const app = require("express")();
const bodyParser = require("body-parser");

const cors = require("cors");

app.use(cors({ origin: true }));
app.use(bodyParser.json());

const { getAllGames } = require("./APIs/games");
const { postGame } = require("./APIs/games");
const { getCurrentId } = require("./APIs/games");

app.get("/games", getAllGames);
app.post("/games", postGame);
app.get("/games/id", getCurrentId);
exports.api = functions.https.onRequest(app);
