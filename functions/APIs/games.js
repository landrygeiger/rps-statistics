// games.js

const { response } = require("express");
const { db } = require("../util/admin");

const password = "********";

exports.getAllGames = (request, response) => {
    db.collection("games").orderBy("id").get().then((data) => {
        let games = [];
        data.forEach((doc) => {
            games.push({
                id: doc.data().id,
                isWin: doc.data().isWin,
                opponent: doc.data().opponent,
                playedMove: doc.data().playedMove
            });
        });
        return response.json(games);
    }).catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
    });
};

exports.getCurrentId = (request, response) => {
    db.collection("games").get().then((data) => {
        return response.json(data.size + 1);
    }).catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code });
    });
}

exports.postGame = (request, response) => {
    if (request.body.password !== password) return response.json({ password: "wrong" })

    const newGame = {
        id: request.body.id,
        isWin: request.body.isWin,
        opponent: request.body.opponent,
        playedMove: request.body.playedMove
    }

    db.collection("games").add(newGame).then((doc) => {
        return response.json(newGame);
    }).catch((err) => {
        response.status(500).json({ error: "Something went wrong" });
        console.error(err);
    });
}