import startOfTheGame from "./start/FindingTraces.js";

const game = (player) => {
    startOfTheGame(player);
    return player;
}

export default game;