const url = "https://us-central1-rock-paper-scissors-statistics.cloudfunctions.net/api/games";
fetch(url, {
    method: "post",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: 22,
        isWin: true,
        opponent: "Landry G.",
        playedMove: "scissors"
    })
})
.then((response) => {
    console.log(response);
})