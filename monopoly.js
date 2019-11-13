console.clear();
// Constants
const settings = {
    goCollectAmount: 10,
    dieCount: 2,
    startingAmount: 500,
    movementStepDelay: 500,
    jailedTurn: 3,
    rentMultiplier: 2000, //For faster game
    taxMultiplier: 30 //For faster game
};

// Global
let game;
let board;
let gameLoaderDOM;
let gameDOM;

document.addEventListener('DOMContentLoaded', function () {
    gameLoaderDOM = document.querySelector('#gameLoader');
    gameDOM = document.createElement('div');
    gameDOM.id = 'game';
    gameLoaderDOM.append(gameDOM);

    GameHelpers.setupGame();
    GameHelpers.setupPlayers();
    GameHelpers.setupEventListeners();
    game.start();
    game.currentPlayer.currentSpace.updateSpaceDetailDisplay();
}, false);


// Classes for helpers
class Vector3D {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Option {
    constructor(name = 'accept', text = 'Ok') {
        this.name = name;
        this.text = text;
    }
}

// Helpers
class MathHelpers {
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

class UIHelpers {
    static menu(player, message, options = [new Option()], icon = '') {
        const buttons = new Map();
        return buttons;
    }
    static notice(player, message, icon) {
        board.inputDisplay.innerHTML = '';
        const header = document.createElement('h2');
        header.innerText = `${player.name}: ${message}`;
        board.inputDisplay.append(header);

        if (icon !== undefined) {
            const dialogIcon = document.createElement('div');
            dialogIcon.className = 'dialogIcon';
            dialogIcon.innerText = icon;
            board.inputDisplay.append(dialogIcon);
        }
    }
    static dialog(player, message, options = [new Option()], icon = '') {
        const buttons = new Map();

        if (icon === '') {
            icon = player.icon;
        }

        board.inputDisplay.innerHTML = '';
        const header = document.createElement('h2');
        header.innerText = `${player.name}: ${message}`;
        board.inputDisplay.append(header);

        const dialogIcon = document.createElement('div');
        dialogIcon.className = 'dialogIcon';
        dialogIcon.innerText = icon;
        board.inputDisplay.append(dialogIcon);

        options.forEach((option) => {
            const button = document.createElement('button');
            button.innerText = option.text;
            board.inputDisplay.append(button);
            buttons.set(option.name, button);
        });

        return buttons;
    }
    static spaceDetail(space) {
        board.spaceDetailDisplay.innerHTML = '';

        const header = document.createElement('h2');
        if (space !== undefined) {
            header.innerText = `${space.name}`;
        } else {
            header.innerText = '[HOVER SPACE TO SEE DETAILS]';
        }
        board.spaceDetailDisplay.append(header);
    }
    static rollDice(player) {
        const message = `${player.name}'s Turn`;
        const button = this.dialog(player, message, [new Option('accept', 'Roll Dice')]).get('accept');

        return button;
    }

    static payTax(player, tax) {
        console.log(tax);
        const message = `Pay ${tax.name}`;
        const buttonText = `Pay \$${tax.amount}${settings.taxMultiplier !== 1 ? ` (x${settings.taxMultiplier})` : ''}`;
        const button = this.dialog(player, message, [new Option('accept', buttonText)], '💸').get('accept');

        return button;
    }

    static buyProperty(player, property) {
        const message = `Buy ${property.name}`;
        const options = [];
        options.push(new Option('accept', `Buy for \$${property.price}`));
        options.push(new Option('decline', 'Cancel'));

        const buttons = this.dialog(player, message, options);

        return buttons;
    }

    static upgradeProperty(player, property) {
        const message = `Upgrade ${property.name}`;
        const options = [];
        options.push(new Option('accept', `Upgrade for \$${property.currentUpgradeCost}`));
        options.push(new Option('decline', 'Cancel'));

        const buttons = this.dialog(player, message, options);

        return buttons;
    }

    static payRent(player, property) {
        const message = `Rent Due at ${property.name} to ${property.owner.name}`;
        const buttonText = `Pay \$${property.calculatedRent}${settings.rentMultiplier !== 1 ? ` (x${settings.rentMultiplier})` : ''} to ${property.owner.name}`;
        const button = this.dialog(player, message, [new Option('accept', buttonText)]).get('accept');

        return button;
    }
}


// Game Assets
class GameAsset {
    constructor(param) {
        //this.game = param.game;
        this.transform = {
            scale: 0,
            rotate: new Vector3D(),
            translate: new Vector3D(),
        };
    }
}

class Board extends GameAsset {
    constructor(param) {
        super(param);
        this.boardLayer = document.createElement('div');
        this.pieceLayer = document.createElement('div');
        this.statsDisplay = document.createElement('div');
        this.inputDisplay = document.createElement('div');
        this.spaceDetailDisplay = document.createElement('div');
    }

    setup() {
        gameDOM.innerHTML = '';
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

        this.settingsDisplay = document.createElement('div');
        this.settingsDisplay.id = 'settings';
        this.settingsDisplay.className = 'hud';
        const logo = document.createElement('h1');
        logo.className = 'logo';
        logo.innerText = 'MONOPOLY';
        this.settingsDisplay.append(logo);
        this.boardLayer.append(this.settingsDisplay);

        this.pieceLayer = document.createElement('div');
        this.pieceLayer.id = 'pieceLayer';

        gameDOM.append(this.pieceLayer);
        gameDOM.append(this.boardLayer);
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
        this.currentSpace = undefined;

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

        this.playerSpaceDOM = document.createElement('div');
        this.playerSpaceDOM.className = 'playerSpace';
        this.playerTextStatsWrapper.append(this.playerSpaceDOM);

        this.playerStateDOM = document.createElement('div');
        this.playerStateDOM.className = 'playerState';
        this.playerTextStatsWrapper.append(this.playerStateDOM);

        board.statsDisplay.append(this.playerStatsWrapper);

        this.playerPieceDOM = document.createElement('div');
        this.playerPieceDOM.className = 'piece';
        this.playerPieceDOM.innerText = this.icon;
        board.pieceLayer.append(this.playerPieceDOM);
    }

    updateDisplay() {
        this.updateStatsDisplay();
        this.updatePiece();
        this.currentSpace.updateSpaceDetailDisplay();
    }

    updateStatsDisplay() {
        this.playerIconDOM.innerText = `${this.icon}`;
        this.playerNameDOM.innerText = `Player: ${this.name}`;
        this.playerMoneyDOM.innerText = `Money: ${this.money}`;
        this.playerStateDOM.innerText = `[${this.state.toUpperCase()}${this.state === 'playing' || this.state === 'bankrupt' ? '' : ` (${this.stateTurn})`}]`;
        if (this.state === 'bankrupt') {
            this.playerStatsWrapper.filter = 'grayscale(100%)';
        }
    }

    updatePiece() {
        this.playerPieceDOM.style.left = `${(this.currentSpace.column - 1) / 11 * 100}%`;
        this.playerPieceDOM.style.top = `${(this.currentSpace.row - 1) / 11 * 100}%`;
    }

    moveTo(nameId = 'start', resolveSpace = true, collectPassGo = false) {
        if (game.spaceMap.has(nameId)) {
            UIHelpers.notice(this, 'Moving...');
            this.currentSpace = game.spaceMap.get(nameId);

            console.log(`${this.name} moves to [${this.currentSpace.name}]!`);

            window.setTimeout(() => {
                if (resolveSpace) {
                    this.currentSpace.resolve(this);
                }

                this.updateDisplay();
            }, settings.movementStepDelay);
        } else {
            throw 'nameId not found.';
        }
    }

    moveForward(steps = 1, resolveSpace = true, collectPassGo = true) {
        // Assume steps > 0
        UIHelpers.notice(this, 'Moving...');
        this.playerPieceDOM.style.animation = `bouncePlayerPiece ${(settings.movementStepDelay / 1000) / 2}s alternate infinite`;       
        
        let i = 0;
        for (i = 0; i < steps; i++) {
            window.setTimeout(() => {
                this.currentSpace = game.spaceMap.get(this.currentSpace.nextId);
                if (collectPassGo && this.currentSpace.nameId === 'start') {
                    console.log('collecting pass go');
                    this.deposit(settings.goCollectAmount);
                }
                this.updateDisplay();
            }, settings.movementStepDelay * i);
        }

        window.setTimeout(() => {
            console.log(`${this.name} landed on ${this.currentSpace.name}!`);
            if (resolveSpace) {
                this.currentSpace.resolve(this);
            }
            this.updateDisplay();
            this.playerPieceDOM.style.animation = '';
        }, settings.movementStepDelay * i);
    }

    moveBackward(steps = 1, resolveSpace = true) {
        // Assume steps > 0
        UIHelpers.notice(this, 'Moving...');
        let i = 0;
        for (i = 0; i < steps; i++) {
            window.setTimeout(() => {
                this.currentSpace = game.spaceMap.get(this.currentSpace.prevId);
                this.updateDisplay();
            }, settings.movementStepDelay * i);
        }

        window.setTimeout(() => {
            console.log(`${this.name} landed on ${this.currentSpace.name}!`);
            if (resolveSpace) {
                this.currentSpace.resolve(this);
            }
            this.updateDisplay();
        }, settings.movementStepDelay * i);
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
        console.log(`withdrawing ${amount} from player[${this.name}]`);
        this.money -= amount;
        this.updateDisplay();
    }
}
// TO DO: 
// *Refactor so every subclass sets icon
class Space extends GameAsset {
    constructor(param) {
        super(param);
        this.name = param.name;

        this.nameId = param.nameId;
        this.nextId = param.nextId;
        this.prevId = param.prevId;

        this.type = param.type;
        this.column = param.column;
        this.row = param.row;
        this.icon = '';

        this.boardSpaceWrapper = document.createElement('div');
        this.boardSpaceWrapper.className = 'space';

        const spaceNumberDOM = document.createElement('div');
        spaceNumberDOM.className = 'spaceNumber';
        this.boardSpaceWrapper.append(spaceNumberDOM);

        this.spaceNameDOM = document.createElement('h3');
        this.spaceNameDOM.className = 'spaceName';
        this.boardSpaceWrapper.append(this.spaceNameDOM);

        this.boardSpaceWrapper.style['grid-column-start'] = this.column;
        this.boardSpaceWrapper.style['grid-row-start'] = this.row;
        this.boardSpaceWrapper.style.border = `1px solid yellowgreen`;

        board.boardLayer.append(this.boardSpaceWrapper);

        this.boardSpaceWrapper.addEventListener('mouseenter', () => {
            this.updateSpaceDetailDisplay();
        });
        this.boardSpaceWrapper.addEventListener('mouseleave', () => {
            game.currentPlayer.currentSpace.updateSpaceDetailDisplay();
        });
        this.updateSpaceDisplay();
    }

    updateSpaceDisplay() {
        this.spaceNameDOM.innerText = this.name;
    }

    updateSpaceDetailDisplay() {
        board.spaceDetailDisplay.innerHTML = '';

        const header = document.createElement('h2');
        header.innerText = `${this.name}`;
        board.spaceDetailDisplay.append(header);

        const iconContainer = document.createElement('div');
        iconContainer.className = 'detailIcon';
        iconContainer.style['border'] = `5px solid ${this.color === undefined ? 'white' : this.color}`;
        let detailIcon = '';

        switch(this.type.toLowerCase()) {
            case 'start':
                detailIcon = '🏁';
                break;
            case 'property':
                detailIcon = '🏠';
                break;
            case 'tax':
                detailIcon = '💸';
                break;
            case 'chest':
                detailIcon = '🎁';
                break;
            case 'chance':
                detailIcon = '❔';
                break;
            case 'jail': 
                detailIcon = '🚫';
                break;
            case 'gotojail':
                detailIcon = '🚫';
                break;
            default:
                detailIcon = '🅿';
                break;           
        }
        iconContainer.innerHTML = detailIcon;
        board.spaceDetailDisplay.append(iconContainer);  
    }

    resolve() {
        console.log(`resolving action of ${this.name}`);
        game.finishTurn();
    }
}
// TO DO:
// *Tax is not taking money out
class Tax extends Space {
    constructor(param) {
        super(param);
        this.amount = param.amount;
    }

    updateSpaceDetailDisplay() {
        super.updateSpaceDetailDisplay();
    }
    
    resolve(player) {
        const button = UIHelpers.payTax(player, this);
        button.addEventListener('click', () => {
            player.withdraw(this.amount * settings.taxMultiplier);
            game.finishTurn();
        });
    }
}

class RandomAction extends Space {
    constructor(param) {
        super(param);
        this.deck = [];
        this.dialogMessage = '';
    }

    updateSpaceDetailDisplay() {
        super.updateSpaceDetailDisplay();
    }

    resolve(player) {
        console.log(`drawing card for ${player.name} from ${this.type}`);
        let message = '';
        switch (this.type.toLowerCase()) {
            case 'chance':
                this.deck = game.chanceCards;
                message = 'Chance!';
                this.icon = '❔';
                break;
            case 'chest':
                this.deck = game.communityChestCards;
                message = 'Community Chest';
                this.icon = '🎁';
                break;
        }

        const button = UIHelpers.dialog(player, message, [new Option('accept', 'Draw')], this.icon).get('accept');
        button.addEventListener('click', () => {
            if (this.deck.length > 0) {
                const randomCardIndex = MathHelpers.randomInt(0, this.deck.length - 1);
                const card = this.deck[randomCardIndex];

                let resolveButtonText = 'Ok';
                let resolveFunction = () => {
                    game.finishTurn();
                };

                switch (card.type.toLowerCase()) {
                    // Change this so it looks up nameId instead 
                    case 'moveto':
                        const space = game.spaceMap.get(card.nameId);
                        resolveButtonText = `Move to ${space.name}`;
                        resolveFunction = () => {
                            player.moveTo(card.nameId, card.resolveSpace, card.collectPassGo);
                            game.finishTurn();
                        };
                        break;
                    case 'withdraw':
                        resolveButtonText = `Pay \$${card.amount}`;
                        resolveFunction = () => {
                            player.withdraw(card.amount * settings.taxMultiplier);
                            game.finishTurn();
                        };
                        break;
                    case 'deposit':
                        resolveButtonText = `Receive \$${card.amount}`;
                        resolveFunction = () => {
                            player.deposit(card.amount);
                            game.finishTurn();
                        };
                        break;
                }

                const resolveButton = UIHelpers.dialog(player, card.description, [new Option('accept', resolveButtonText)], card.icon).get('accept');
                resolveButton.addEventListener('click', resolveFunction);
            } else {
                game.finishTurn();
            }
        });
    }
}

class GoToJail extends Space {
    constructor(param) {
        super(param);
    }

    updateSpaceDetailDisplay() {
        super.updateSpaceDetailDisplay();
    }

    resolve(player) {
        const message = 'Move to Jail';
        const button = UIHelpers.dialog(player, message).get('accept');
        button.addEventListener('click', () => {
            player.moveTo('jail');
        });
    }
}

class Jail extends Space {
    constructor(param) {
        super(param);
    }

    updateSpaceDetailDisplay() {
        super.updateSpaceDetailDisplay();  
    }

    resolve(player) {
        console.log(`${player.name} is in jail`);
        player.state = 'jailed';
        player.stateTurn = settings.jailedTurn;
        const message = 'is in Jail';
        const button = UIHelpers.dialog(player, message).get('accept');
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
        this.upgradeIcons = ['🏠', '🏠🏠', '🏠🏠🏡', '🏠🏠🏡🏡', '🏠🏠🏡🏡🏨'];
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
        this.updateSpaceDetailDisplay();
    }

    updatePropertyDisplay() {
        if (this.owner !== undefined) {
            this.ownerDOM.innerText = `Owner: ${this.owner.icon}`;
            this.priceDOM.innerText = `Rent: \$${this.calculatedRent}`;
        } else {
            this.priceDOM.innerText = `Buy: \$${this.price}`;
        }
        if (this.upgradeLevel > 0) {
            this.upgradeDOM.innerText = this.upgradeIcons[this.upgradeLevel - 1];
        }
    }

    updateSpaceDetailDisplay() {
        super.updateSpaceDetailDisplay();
        const detailsContainer = document.createElement('div');
        detailsContainer.className = 'details';
        detailsContainer.style.display = 'grid';
        detailsContainer.style['grid-template-columns'] = '5fr 2fr 2fr';

        ['Upgrade', 'Cost', 'Rent'].forEach((headerText) => {
            const header = document.createElement('h3');
            header.innerText = headerText;
            detailsContainer.append(header);
        });
    
        for(let i = 0; i < this.rent.length; i++) {
            const upgradeIconDOM = document.createElement('div');
            const upgradeCostDOM = document.createElement('div');
            const rentDOM = document.createElement('div');

            if(i === 0) {
                upgradeIconDOM.innerText = 'No Upgrade';                
                upgradeCostDOM.innerText = '-'   ;            

            } else {
                upgradeIconDOM.innerText = this.upgradeIcons[i - 1];
                upgradeCostDOM.innerText = this.upgradeCost[i - 1];               
            }

            rentDOM.innerHTML = this.rent[i];
            detailsContainer.append(upgradeIconDOM);         
            detailsContainer.append(upgradeCostDOM);
            detailsContainer.append(rentDOM);                           
        }

        board.spaceDetailDisplay.append(detailsContainer);         
    }

    resolve(player) {
        // console.log('resolving action of property');
        if (this.owner === undefined) {
            console.log(`this property is not owned. prompt player to buy.`);
            const buttons = UIHelpers.buyProperty(player, this);
            buttons.get('accept').addEventListener('click', () => {
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
            buttons.get('decline').addEventListener('click', () => {
                game.finishTurn();
            });
        } else if (this.owner === player) {
            console.log(`this property is owned by player. check if upgrade is available.`);
            //check if player own all property in color group
            let ownedAll = true;

            for (const property of game.propertyGroups.get(this.color).value) {
                if (property.owner !== player) {
                    ownedAll = false;
                    break;
                }
            }

            //Utility property does not require ownership of all property in the group to upgrade
            if ((this.color === 'black' || ownedAll) && this.upgradeLevel < this.rent.length - 1) {
                const buttons = UIHelpers.upgradeProperty(player, this);
                buttons.get('accept').addEventListener('click', () => {
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
                buttons.get('decline').addEventListener('click', () => {
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
        this.turnCount = 0;
        this.players = [];
        this.currentPlayerIndex = 0;

        this.spaceMap = new Map();
        this.startSpace = undefined;

        // Monopoly only
        this.propertyGroups = new Map();
        this.chanceCards = [];
        this.communityChestCards = [];
    }

    setup() {
        this.turnCount = 0;
        this.players = [];
        this.currentPlayerIndex = 0;

        this.spaceMap = new Map();

        this.chanceCards = [];
        this.communityChestCards = [];
    }

    addPlayer(param) {
        const newPlayer = new Player(param);
        this.players.push(newPlayer);
        newPlayer.moveTo('start');
        newPlayer.updateDisplay();
    }

    addSpace(param) {
        let newSpace;
        switch (param.type.toLowerCase()) {
            case 'property':
                newSpace = new Property(param);
                if (!this.propertyGroups.has(newSpace.color)) {
                    this.propertyGroups.set(newSpace.color, { value: [] });
                }
                this.propertyGroups.get(newSpace.color).value.push(newSpace);
                break;
            case 'jail':
                newSpace = new Jail(param);
                break;
            case 'gotojail':
                newSpace = new GoToJail(param);
                break;
            case 'chance':
                newSpace = new RandomAction(param);
                break;
            case 'chest':
                newSpace = new RandomAction(param);
                break;
            case 'tax':
                newSpace = new Tax(param);
                break;
            default:
                newSpace = new Space(param);
        }
        this.spaceMap.set(newSpace.nameId, newSpace);
    }

    start() {
        this.play();
    }

    play() {
        this.currentPlayer = this.players[this.currentPlayerIndex];
        const player = this.currentPlayer;

        if (player.state !== 'bankrupt') {
            player.currentSpace.updateSpaceDetailDisplay();
            if (player.state === 'playing') {
                const button = UIHelpers.rollDice(player);
                button.addEventListener('click', () => {
                    this.rollDice();
                });
            } else if (player.state === 'jailed') {
                const message = player.stateTurn > 1 ? `${player.stateTurn} Turn${player.stateTurn > 1 ? 's' : ''} Remaining in Jail` : 'Last Turn in Jail';
                const buttonText = player.stateTurn > 1 ? 'Skip Turn' : 'Get Out';
                const button = UIHelpers.dialog(player, message, [new Option('accept', buttonText)]).get('accept');
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

    rollDice(count = settings.dieCount) {
        const player = this.players[this.currentPlayerIndex];
        const dieFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        let totalRoll = 0;
        let icon = '';

        console.log(`roll dice, money: ${player.money}`);

        for (let i = 0; i < count; i++) {
            const roll = MathHelpers.randomInt(1, 6);
            console.log(`${player.name} rolls the dice! ${roll}!`);
            totalRoll += roll;
            icon += dieFaces[roll - 1];
        }

        const message = `Rolled ${totalRoll}`;
        const button = UIHelpers.dialog(player, message, [new Option('accept', 'Move')], icon).get('accept');
        button.addEventListener('click', () => {
            player.moveForward(totalRoll);
        });
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
            const button = UIHelpers.dialog(player, message, [new Option('accept', 'Ok')]).get('accept');
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
        const player = game.players.find((current) => current.state !== 'bankrupt');
        const message = `${player.name} wins!`;
        const button = UIHelpers.dialog(player, message, [new Option('accept', 'Reset Game')], `🏆${player.icon}`).get('accept');

        button.addEventListener('click', () => {
            GameHelpers.setupGame();
            GameHelpers.setupPlayers();
            GameHelpers.setupEventListeners();
            game.start();
            game.currentPlayer.currentSpace.updateSpaceDetailDisplay();
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
        game.startSpace = game.spaceMap.get('start');
        game.chanceCards = GameDataHelpers.loadChanceCards();
        game.communityChestCards = GameDataHelpers.loadCommunityChestCards();
    }
    static setupPlayers() {
        game.addPlayer({ name: 'P1', money: settings.startingAmount, icon: '🚗' });
        game.addPlayer({ name: 'P2', money: settings.startingAmount, icon: '🥾' });
        game.addPlayer({ name: 'P3', money: settings.startingAmount, icon: '🐕' });
        game.addPlayer({ name: 'P4', money: settings.startingAmount, icon: '🐈' });
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
        gameDOM.style['transform-origin'] = `${boardHeight / 2}px ${boardWidth / 2}px`;

        const rotate = `rotateX(${board.transform.rotate.x}deg) rotateY(${board.transform.rotate.y}deg) rotateZ(${board.transform.rotate.z}deg)`;
        const scale = `scale(${board.transform.scale})`;
        const translate = `translateX(${board.transform.translate.x}px) translateY(${board.transform.translate.y}px) translateZ(${board.transform.translate.z}px)`;
        gameDOM.style.transform = `${rotate} ${scale} ${translate}`;
        return board.transform;
    }
}