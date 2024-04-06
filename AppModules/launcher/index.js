const { global } = require("../dictionary");

const {
    knightDragonAndPrincessGame,
    poleChudesGame,
    trueOrFalseGame,
    dropCoin,
    makeWordGame,
    blackJackGame
} = require("../games");

const readline = require("readline");

const gameInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
    prompt: ""
});

const gamesArray = [
    { id: "1", game: knightDragonAndPrincessGame },
    { id: "2", game: poleChudesGame },
    { id: "3", game: makeWordGame },
    { id: "4", game: blackJackGame },
    { id: "5", game: trueOrFalseGame },
    { id: "6", game: dropCoin }
];

const countResult = (gameResult) => {
    gameResult === "draw"
        ? console.log(global.draw)
        : gameResult
          ? console.log(global.win)
          : console.log(global.lose);
};

const startLauncher = () => {
    gameInterface.question(global.chooseGame, (answer) => {
        const options = [1, 2, 3, 4, 5, 6];
        if (options.includes(parseInt(answer.trim()))) {
            startGame(answer.trim());
        } else if (answer.trim() === "7") {
            stopLauncher();
        } else {
            console.log(
                "Неверный Ввод. Пожалуйста, введите 1, 2, 3, 4, 5, 6 или 7."
            );
            startLauncher();
        }
    });
};

const stopLauncher = () => {
    console.log(global.goodbye);
    gameInterface.close();
};

const afterGame = (gameId) => {
    const gameControl = {
        1: async () => await startGame(gameId),
        2: startLauncher,
        3: stopLauncher
    };
    gameInterface.question(
        `
        1. Сыграй в ту же игру еще раз 
        2. Выбери другую игру 
        3. Выход \n`,
        (answer) => {
            const selectedAction = gameControl[answer.trim()];
            if (selectedAction) {
                selectedAction();
            } else {
                console.log("Неверный Ввод. Пожалуйста, введите 1, 2 или 3.");
                afterGame(gameId);
            }
        }
    );
};
const startGame = async (gameId) => {
    const { game } = gamesArray.find(({ id }) => id === gameId);

    if (game) {
        countResult(await game());
        afterGame(gameId);
    } else {
        console.log(global.wrongInput);
        startLauncher();
    }
};

module.exports = startLauncher;
