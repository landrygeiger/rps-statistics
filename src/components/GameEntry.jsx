import React from "react";
import { Game } from "./StatDisplay";

const url = "https://us-central1-rock-paper-scissors-statistics.cloudfunctions.net/api/games";

class GameEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sentGames: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const radios = document.getElementsByName("move");
        let selected = ""
        for(let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                selected = radios[i].value;
                break;
            }
        }

        const currentIdPromise = await fetch(url.concat("/id"));
        const currentId = await currentIdPromise.json();
        console.log(currentId);

        const game = {
            id: currentId,
            isWin: document.getElementById("is-win").checked,
            playedMove: selected,
            opponent: document.getElementById("opponent").value,
            password: document.getElementById("password").value
        }
        
        await fetch(url, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(game)
        })
        .then((response) => {
            console.log(response);
        });

        this.setState((current) => {
            const games = current.sentGames.slice();
            games.push(game);
            return ({
                sentGames: games.reverse()
            });
        });
    }

    render() {
        const gamesToRender = this.state.sentGames.map(game => <Game game={game} />);

        return (
            <div className="content-area shadow">
                <h2>GAME ENTRY</h2>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <label for="is-win">Win:</label><br/>
                    <label className="checkbox-container">
                        <input type="checkbox" id="is-win" name="is-win" />
                        <span className="custom-check"><i className="fa fa-award"></i></span>
                    </label>
                    
                    
                    <label>Move:</label><br/>
                    <div className="flex-line-container">
                        <label for="rock" className="radio-container">
                            <input type="radio" id="rock" name="move" value="rock" />
                            <span className="radio-icon"><i className="far fa-hand-rock"></i></span>
                        </label>
                        
                        <label for="paper" className="radio-container">
                            <input type="radio" id="paper" name="move" value="paper" />
                            <span className="radio-icon"><i className="far fa-hand-paper"></i></span>
                        </label>
                        
                        <label for="scissors" className="radio-container">
                            <input type="radio" id="scissors" name="move" value="scissors" />
                            <span className="radio-icon"><i className="far fa-hand-scissors"></i></span>
                        </label>
                    </div>

                    <label for="opponent">Opponent:</label><br/>
                    <input type="text" id="opponent"/><br/>
                    
                    <label for="password">Password:</label><br/>
                    <input type="password" id="password"/><br/>

                    <input type="submit" value="Submit" />
                </form>
                <div className="flex-column-container">
                    {gamesToRender}
                </div>
            </div>
        )
    }
}

export default GameEntry;