// TO DO:
// *Set player state to bankrupt if money is less than 0 [DONE]
// *Check if game is over after setting player state to lost [DONE]
// *Check if other property in the same color group has the same upgrade level before prompting [DONE]
// *Implement resolve function of jail space [DONE]
// *Implement resolve function of chance space
// *Implement resolve function of community chest space
// *Implement getter/setter for player state
// *Remove rent multiplier after testing
// *Property display showing details of current property that the player is in
// *Display of buy price or rent of property in the board overview [DONE]
// *Save/load feature (import/export save state from JSON)
// *Add mortgage mechanics

// FIX:
// *Roll two dice instead of one
// *Change placeholder values of property
// *Change emoji piece icons to svg/font
// *Position offset on iOS (only on editor view) [FIXED?]

// REFACT:
// *Fix adding class to DOM to be more consistent (className vs classList.add) [DONE]

console.clear();
// Constants
const gameLoaderDOM = document.querySelector('#monopoly');
const settings = {
    goCollect: 10,
    startingMoney: 500,
    jailedTurn: 3,
    rentMultiplier: 2000
};

// Global
let game;
let board;

// Helpers
class MathHelpers {
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

class UIHelpers {
    // TO DO:
    // *Refactor this to map different actions to type parameter 
    static rollDice(player) {
        board.inputDisplay.innerHTML = '';
        const header = document.createElement('h2');
        const button = document.createElement('button');
        header.innerText = `${player.name}'s Turn`;
        board.inputDisplay.append(header);
        button.innerText = `Roll Dice`;
        board.inputDisplay.append(button);
        return button;
    }

    static buyProperty(player, property) {
        board.inputDisplay.innerHTML = '';
        const header = document.createElement('h2');
        header.innerText = `${player.name}: Buy ${property.name}`;
        board.inputDisplay.append(header);
        const accept = document.createElement('button');
        accept.innerText = `Buy for \$${property.price}`;
        board.inputDisplay.append(accept);
        const decline = document.createElement('button');
        decline.innerText = `Cancel`;
        board.inputDisplay.append(decline);
        return { accept: accept, decline: decline };
    }

    static upgradeProperty(player, property) {
        board.inputDisplay.innerHTML = '';
        const header = document.createElement('h2');
        header.innerText = `${player.name}: Upgrade ${property.name}`;
        board.inputDisplay.append(header);
        const accept = document.createElement('button');
        accept.innerText = `Upgrade for \$${property.currentUpgradeCost}`;
        board.inputDisplay.append(accept);
        const decline = document.createElement('button');
        decline.innerText = `Cancel`;
        board.inputDisplay.append(decline);
        return { accept: accept, decline: decline };
    }

    static payRent(player, property) {
        board.inputDisplay.innerHTML = '';
        const header = document.createElement('h2');
        header.innerText = `${player.name}: Rent Due at ${property.name} to ${property.owner.name}`;
        board.inputDisplay.append(header);
        const button = document.createElement('button');
        button.innerText = `Pay \$${property.calculatedRent}${settings.rentMultiplier !== 1 ? ` (x${settings.rentMultiplier})` : ''} to ${property.owner.name}`;
        board.inputDisplay.append(button);
        return button;
    }

    static confirm(player, message, buttonText = 'OK') {
        board.inputDisplay.innerHTML = '';
        const header = document.createElement('h2');
        header.innerText = `${player.name}: ${message}`;
        board.inputDisplay.append(header);
        const button = document.createElement('button');
        button.innerText = buttonText;
        board.inputDisplay.append(button);
        return button;
    }
}

// 3D Vector for transforms
class Vector3D {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

// Game Assets
class GameAsset {
    constructor(param) {
        //this.game = param.game;
        this.transform = {
            scale: 0,
            rotate: new Vector3D,
            translate: new Vector3D,
        };
    }
}

class Board extends GameAsset {
    constructor(param) {
        super(param);
        this.boardLayer;
        this.pieceLayer;
        this.statsDisplay;
        this.inputDisplay;
        this.spaceDetailDisplay;
    }

    setup() {
        gameLoaderDOM.innerHTML = '';
        this.boardLayer = document.createElement('div');
        this.boardLayer.id = 'boardLayer';

        this.statsDisplay = document.createElement('div');
        this.statsDisplay.id = 'stats';
        this.statsDisplay.className = 'hud';
        this.boardLayer.append(this.statsDisplay);

        this.inputDisplay = document.createElement('div');
        this.inputDisplay.id = 'input';
        this.inputDisplay.className = 'hud';
        this.boardLayer.append(this.inputDisplay);

        this.spaceDetailDisplay = document.createElement('div');
        this.spaceDetailDisplay.id = 'spaceDetail';
        this.spaceDetailDisplay.className = 'hud';
        this.boardLayer.append(this.spaceDetailDisplay);

        this.pieceLayer = document.createElement('div');
        this.pieceLayer.id = 'pieceLayer';

        gameLoaderDOM.append(this.pieceLayer);
        gameLoaderDOM.append(this.boardLayer);
    }
}

class Player extends GameAsset {
    constructor(param) {
        super(param);
        this.name = param.name;
        this.icon = param.icon;
        this.money = param.money;
        this.state = 'playing';
        this.stateTurn = 0;
        this.position = 0;

        this.playerStatsWrapper = document.createElement('div');
        this.playerStatsWrapper.className = 'playerStats';

        this.playerIconDOM = document.createElement('div');
        this.playerIconDOM.className = 'playerIcon';
        this.playerStatsWrapper.append(this.playerIconDOM);

        this.playerTextStatsWrapper = document.createElement('div');
        this.playerTextStatsWrapper.className = 'playerTextStats';
        this.playerStatsWrapper.append(this.playerTextStatsWrapper);

        this.playerNameDOM = document.createElement('h3');
        this.playerNameDOM.className = 'playerName';
        this.playerTextStatsWrapper.append(this.playerNameDOM);

        this.playerMoneyDOM = document.createElement('div');
        this.playerMoneyDOM.className = 'playerMoney';
        this.playerTextStatsWrapper.append(this.playerMoneyDOM);

        this.playerPositionDOM = document.createElement('div');
        this.playerPositionDOM.className = 'playerPosition';
        this.playerTextStatsWrapper.append(this.playerPositionDOM);

        this.playerStateDOM = document.createElement('div');
        this.playerStateDOM.className = 'playerState';
        this.playerTextStatsWrapper.append(this.playerStateDOM);

        board.statsDisplay.append(this.playerStatsWrapper);

        this.playerPieceDOM = document.createElement('div');
        this.playerPieceDOM.className = 'piece';
        this.playerPieceDOM.innerText = this.icon;
        this.updatePiece();

        board.pieceLayer.append(this.playerPieceDOM);

        this.updateDisplay();
    }

    updateDisplay() {
        this.updateStatsDisplay();
        this.updatePiece();
    }

    updateStatsDisplay() {
        this.playerIconDOM.innerText = `${this.icon}`;
        this.playerNameDOM.innerText = `Player: ${this.name}`;
        this.playerMoneyDOM.innerText = `Money: ${this.money}`;
        this.playerPositionDOM.innerText = `Position: ${this.position}`;
        this.playerStateDOM.innerText = `[${this.state.toUpperCase()}${this.state === 'playing' || this.state === 'bankrupt' ? '' : ` (${this.stateTurn})`}]`;
        if (this.state === 'bankrupt') {
            this.playerStatsWrapper.filter = 'grayscale(100%)';
        }
    }

    updatePiece(position = this.position) {
        // CURRENT:
        // Position has 1 cell offset on iOS device [FIXED?]
        const space = game.spaces[this.position];
        this.playerPieceDOM.style.left = `${(space.column - 1) / 11 * 100}%`;
        this.playerPieceDOM.style.top = `${(space.row - 1) / 11 * 100}%`;
    }

    moveTo(position) {
        this.position = position;
        const space = game.spaces[this.position];
        space.resolve(this);
        this.updateDisplay();
        this.updatePiece();
    }

    transfer(amount, player) {
        //Assume amount >= 0
        player.deposit(Math.min(amount, this.money));
        this.money -= amount;
        this.updateDisplay();
    }

    deposit(amount) {
        //Assume amount >= 0
        this.money += amount;
        this.updateDisplay();
    }

    withdraw(amount) {
        //Assume amount >= 0
        this.money -= amount;
        this.updateDisplay();
    }
}

class Space extends GameAsset {
    constructor(param) {
        super(param);
        this.name = param.name;
        this.type = param.type;
        this.column = param.column;
        this.row = param.row;
        this.position = param.position;

        this.boardSpaceWrapper = document.createElement('div');
        this.boardSpaceWrapper.className = 'space';

        const spaceNumberDOM = document.createElement('div');
        spaceNumberDOM.className = 'spaceNumber';
        spaceNumberDOM.innerText = `(${this.position})`;
        this.boardSpaceWrapper.append(spaceNumberDOM);

        this.spaceNameDOM = document.createElement('h3');
        this.spaceNameDOM.className = 'spaceName';
        this.boardSpaceWrapper.append(this.spaceNameDOM);

        this.boardSpaceWrapper.style['grid-column-start'] = this.column;
        this.boardSpaceWrapper.style['grid-row-start'] = this.row;
        this.boardSpaceWrapper.style.border = `1px solid yellowgreen`;

        board.boardLayer.append(this.boardSpaceWrapper);

        this.updateSpaceDisplay();
    }

    updateSpaceDisplay() {
        this.spaceNameDOM.innerText = this.name;
    }

    resolve() {
        console.log(`resolving action of ${this.name}`);
        game.finishTurn();
    }
}

class Chance extends Space {
    constructor(param) {
        super(param);
    }

    resolve(player) {
        console.log(`drawing chance card for ${player.name}`);
        //Add chance logic here
    }
}

class GoToJail extends Space {
    constructor(param) {
        super(param);
    }

    resolve(player) {
        console.log(`Moving ${player.name} to jail`);
        const jailSpaceIndex = game.spaces.findIndex((space) => space.type === 'jail');
        //Assume that spaces has at least 1 jail
        player.moveTo(jailSpaceIndex);
    }
}

class Jail extends Space {
    constructor(param) {
        super(param);
    }

    resolve(player) {
        console.log(`${player.name} jailed`);
        player.state = 'jailed';
        player.stateTurn = settings.jailedTurn;
        const button = UIHelpers.confirm(player, ' Jailed');
        button.addEventListener('click', () => {
            game.finishTurn();
        });
    }
}

class Property extends Space {
    constructor(param) {
        super(param);
        this.color = param.color;
        this.price = param.price;
        this.rent = param.rent;
        this.upgradeCost = param.upgradeCost;
        this.owner = undefined;
        this.upgradeLevel = 0;

        this.ownerDOM = document.createElement('span');
        this.ownerDOM.className = 'owner';
        this.boardSpaceWrapper.append(this.ownerDOM);

        this.upgradeDOM = document.createElement('span');
        this.upgradeDOM.className = 'upgrade';
        this.boardSpaceWrapper.append(this.upgradeDOM);

        this.priceDOM = document.createElement('span');
        this.priceDOM.className = 'price';
        this.boardSpaceWrapper.append(this.priceDOM);

        if (this.row === 1) {
            this.boardSpaceWrapper.style['border-bottom'] = `5px solid ${this.color}`;
        }
        if (this.row === 11) {
            this.boardSpaceWrapper.style['border-top'] = `5px solid ${this.color}`;
        }
        if (this.column === 1) {
            this.boardSpaceWrapper.style['border-right'] = `5px solid ${this.color}`;
        }
        if (this.column === 11) {
            this.boardSpaceWrapper.style['border-left'] = `5px solid ${this.color}`;
        }
        this.updatePropertyDisplay();
    }

    get calculatedRent() {
        return this.rent[this.upgradeLevel];
    }

    get currentUpgradeCost() {
        return this.upgradeCost[this.upgradeLevel];
    }

    updateDisplay() {
        this.updateSpaceDisplay();
        this.updatePropertyDisplay();
    }

    updatePropertyDisplay() {
        if (this.owner !== undefined) {
            this.ownerDOM.innerText = `Owner: ${this.owner.icon}`;
            this.priceDOM.innerText = `Rent: \$${this.calculatedRent}`;
        } else {
            this.priceDOM.innerText = `Buy: \$${this.price}`;
        }
        if (this.upgradeLevel > 0) {
            const upgradeIcons = ['🏠', '🏠🏠', '🏠🏠🏡', '🏠🏠🏡🏡', '🏠🏠🏡🏡🏨'];

            this.upgradeDOM.innerText = upgradeIcons[this.upgradeLevel - 1];
        }
    }

    resolve(player) {
        // console.log('resolving action of property');
        if (this.owner === undefined) {
            console.log(`this property is not owned. prompt player to buy.`);
            const buttons = UIHelpers.buyProperty(player, this);
            buttons.accept.addEventListener('click', () => {
                if (player.money >= this.price) {
                    player.withdraw(this.price);
                    this.owner = player;
                    console.log(`${this.name} is bought by ${player.name} for \$${this.price}`);
                    this.updateDisplay();
                } else {
                    console.log(`insufficient funds!`);
                }
                game.finishTurn();
            });
            buttons.decline.addEventListener('click', () => {
                game.finishTurn();
            });
        } else if (this.owner === player) {
            console.log(`this property is owned by player. check if upgrade is available.`);
            //check if player own all property in color group
            const owned = game.spaces.reduce((count, current) => count + ((current.owner === player && current.color === this.color) ? 1 : 0), 0);
            const total = game.spaces.reduce((count, current) => count + (current.color === this.color ? 1 : 0), 0);
            console.log(`group: ${this.color} total: ${total} owned: ${owned}`);
            //Utility property does not require ownership of all property in the group to upgrade
            if ((this.color === 'black' || owned === total) && this.upgradeLevel < this.rent.length - 1) {
                const buttons = UIHelpers.upgradeProperty(player, this);
                buttons.accept.addEventListener('click', () => {
                    if (player.money >= this.currentUpgradeCost) {
                        player.withdraw(this.currentUpgradeCost);
                        console.log(`${this.name} is upgraded by ${player.name} for \$${this.currentUpgradeCost}`);
                        this.upgradeLevel++;
                        this.updateDisplay();
                    } else {
                        console.log(`insufficient funds!`);
                    }
                    game.finishTurn();
                });
                buttons.decline.addEventListener('click', () => {
                    game.finishTurn();
                });
            } else {
                console.log(`own all property in this color group to unlock upgrade.`);
                game.finishTurn();
            }
        } else {
            console.log(`this property is owned by another player. transfer ${this.calculatedRent} to ${this.owner.name}`);
            const button = UIHelpers.payRent(player, this);
            button.addEventListener('click', () => {
                player.transfer(this.calculatedRent * settings.rentMultiplier, this.owner);
                game.finishTurn();
            });
        }
    }
}

class Game {
    constructor() {
        this.players;
        this.spaces;
        this.chanceCards;
        this.communityChestCards;
        this.currentPlayerIndex;
        this.turnCount;
    }

    setup() {
        this.players = [];
        this.spaces = [];
        this.chanceCards = [];
        this.communityChestCards = [];
        this.currentPlayerIndex = 0;
        this.turnCount = 0;
    }

    addPlayer(param) {
        // param.game = this;
        this.players.push(new Player(param));
    }

    addSpace(param) {
        param.position = this.spaces.length;
        switch (param.type.toLowerCase()) {
            case 'property':
                this.spaces.push(new Property(param));
                break;
            case 'jail':
                this.spaces.push(new Jail(param));
                break;
            case 'gotojail':
                this.spaces.push(new GoToJail(param));
                break;
            default:
                this.spaces.push(new Space(param));
        }
    }

    start() {
        this.play();
    }

    play() {
        this.currentPlayer = this.players[this.currentPlayerIndex];
        const player = this.currentPlayer;
        if (player.state !== 'bankrupt') {
            if (player.state === 'playing') {
                const button = UIHelpers.rollDice(player);
                button.addEventListener('click', () => {
                    console.log('roll dice');
                    this.rollDice();
                });
            } else if (player.state === 'jailed') {
                const message = player.stateTurn > 1 ? `${player.stateTurn} Turn${player.stateTurn > 1 ? 's' : ''} Remaining in Jail` : 'Last Turn in Jail';
                const buttonText = player.stateTurn > 1 ? 'Skip Turn' : 'Get Out';
                const button = UIHelpers.confirm(player, message, buttonText);
                button.addEventListener('click', () => {
                    player.stateTurn--;
                    if (player.stateTurn === 0) {
                        player.state = 'playing';
                    }
                    player.updateDisplay();
                    this.finishTurn();
                });
            }
        } else {
            this.nextTurn();
        }
    }

    rollDice() {
        const player = this.players[this.currentPlayerIndex];
        const roll = MathHelpers.randomInt(1, 6);
        console.log(`${player.name} rolls the dice! ${roll}!`);

        let position = player.position + roll;
        if (position >= this.spaces.length) {
            position = position % this.spaces.length;
            player.deposit(settings.goCollect);
            console.log(`passed start, collect \$${settings.goCollect}`);
        }

        console.log(`${player.name} lands in ${position}/${this.spaces.length - 1}!`);
        player.moveTo(position);
    }

    finishTurn() {
        const player = this.players[this.currentPlayerIndex];
        //Check if player is bankrupt
        if (player.money < 0) {
            player.state = 'bankrupt';
            player.playerStatsWrapper.style.filter = 'grayscale(100%)';
            player.playerPieceDOM.style.filter = 'grayscale(100%)';
            player.updateDisplay();
            const message = 'GAME OVER';
            const button = UIHelpers.confirm(player, message);
            button.addEventListener('click', () => {
                this.nextTurn();
            });
        } else {
            this.nextTurn();
        }
    }

    nextTurn() {
        console.log(`turn ended for ${this.currentPlayer.name}`);
        console.log(`----------------`);

        const activePlayerCount = game.players.reduce((count, current) => count + ((current.state !== 'bankrupt') ? 1 : 0), 0);
        if (activePlayerCount > 1) {
            this.currentPlayerIndex++;
            this.currentPlayer = this.players[this.currentPlayerIndex];
            if (this.currentPlayerIndex >= this.players.length) {
                this.currentPlayerIndex = 0;
            }

            this.turnCount++;
            this.play();
        } else {
            this.end();
        }
    }

    end() {
        const winner = game.players.find((current) => current.state !== 'bankrupt');
        const button = UIHelpers.confirm(winner, `${winner.name} wins!`, 'Reset Game');
        button.addEventListener('click', () => {
            // GameHelpers.setupBoard();
            GameHelpers.setupGame();
            GameHelpers.setupPlayers();
            GameHelpers.setupEventListeners();
            game.start();
        });
    }
}

class GameHelpers {
    static setupGame() {
        board = new Board();
        board.setup();
        game = new Game();
        game.setup();

        //Spaces data is already loaded in another js file (See script header or codepen settings)
        GameDataHelpers.loadSpaces().forEach((space) => game.addSpace(space));
        game.chanceCards = GameDataHelpers.loadChanceCards();
        game.communityChestCards = GameDataHelpers.loadCommunityChestCards();
    }
    static setupPlayers() {
        game.addPlayer({ name: 'P1', money: settings.startingMoney, icon: '🚗' });
        game.addPlayer({ name: 'P2', money: settings.startingMoney, icon: '🥾' });
        game.addPlayer({ name: 'P3', money: settings.startingMoney, icon: '🐕' });
        game.addPlayer({ name: 'P4', money: settings.startingMoney, icon: '🐈' });
    }
    static setupEventListeners() {
        window.removeEventListener('resize', this.resizeBoard);
        window.addEventListener('resize', this.resizeBoard);
        this.resizeBoard();
    }
    static resizeBoard() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        // Get width and height of board then set transform scale
        const boardWidth = board.boardLayer.offsetWidth;
        const boardHeight = board.boardLayer.offsetHeight;
        board.transform.scale = Math.min(
            windowWidth / boardWidth,
            windowHeight / boardHeight
        ) * 0.99;
        gameLoaderDOM.style['transform-origin'] = `${boardHeight / 2}px ${boardWidth / 2}px`;

        const rotate = `rotateX(${board.transform.rotate.x}deg) rotateY(${board.transform.rotate.y}deg) rotateZ(${board.transform.rotate.z}deg)`;
        const scale = `scale(${board.transform.scale})`;
        const translate = `translateX(${board.transform.translate.x}px) translateY(${board.transform.translate.y}px) translateZ(${board.transform.translate.z}px)`;
        gameLoaderDOM.style.transform = `${rotate} ${scale} ${translate}`;
        return board.transform;
    }
}

GameHelpers.setupGame();
GameHelpers.setupPlayers();
GameHelpers.setupEventListeners();
game.start();

// -Player roll dice
// -Resolve action
//    If pass start point:
//       -Collect 
//    If property:
//       If property is unowned:
//          -Prompt to buy
//             If accept purchase
//                -Change property owner to player
//             If decline purchase
//                -Auction property
//       If property is owned by landed player:
//          If landed player own all property in color group:
//             -Prompt to upgrade
//       If property is owned by other player:
//          -Pay rent
//    If jail:
//       Set player state to jail
// -Check if Game Over
//    If money is less than 0
//       -Set player state to game over
//       -Check if current number of player is more than 0
//    If turn count reaches zero

