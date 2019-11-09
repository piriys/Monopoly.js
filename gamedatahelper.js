// TO DO:
// *Add ajax JSON loading & put these values into JSON
class GameDataHelpers {
    static loadChanceCards() {
        return [{
            "description": "Advance to Illinois Avenue",
            "icon": "🛫",
            "type": "moveToProperty",
            "propertyName": "Illinois Avenue",
            "collectPassGo": true
        },
        {
            "description": "Advance to St. Charles Place",
            "icon": "🛫",
            "type": "moveToProperty",
            "propertyName": "St. Charles Place",
            "collectPassGo": true
        },
        {
            "description": "Pay Poor Tax of $15",
            "icon": "💸",
            "type": "withdraw",
            "amount": 15
        }];
    }
    static loadCommunityChestCards() {
        return [{
            "description": "From Sale of Stock You Get $50",
            "icon": "💰",
            "type": "deposit",
            "amount": 50
        },
        {
            "description": "Income tax refund— Collect $20",
            "icon": "💰",
            "type": "deposit",
            "amount": 20
        }];
    }
    static loadSpaces() {
        return [{
            "name": "Go",
            "type": "start",
            "column": 11,
            "row": 11
        },
        {
            "name": "Mediteranean Avenue",
            "type": "property",
            "column": 10,
            "row": 11,
            "color": "rosybrown",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "Community Chest",
            "type": "chest",
            "column": 9,
            "row": 11
        },
        {
            "name": "Baltic Avenue",
            "type": "property",
            "column": 8,
            "row": 11,
            "color": "rosybrown",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "Income Tax",
            "type": "tax",
            "column": 7,
            "row": 11,
            "amount": 200
        },
        {
            "name": "Reading Railroad",
            "type": "property",
            "column": 6,
            "row": 11,
            "color": "black",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "Oriental Avenue",
            "type": "property",
            "column": 5,
            "row": 11,
            "color": "aquamarine",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "Chance",
            "type": "chance",
            "column": 4,
            "row": 11
        },
        {
            "name": "Vermont Avenue",
            "type": "property",
            "column": 3,
            "row": 11,
            "color": "aquamarine",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "Connecticut Avenue",
            "type": "property",
            "column": 2,
            "row": 11,
            "color": "aquamarine",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "Jail",
            "type": "jail",
            "column": 1,
            "row": 11
        },
        {
            "name": "St. Charles Place",
            "type": "property",
            "column": 1,
            "row": 10,
            "color": "fuchsia",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "Electric Company",
            "type": "property",
            "column": 1,
            "row": 9,
            "color": "black",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "States Avenue",
            "type": "property",
            "column": 1,
            "row": 8,
            "color": "fuchsia",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "Virginia Avenue",
            "type": "property",
            "column": 1,
            "row": 7,
            "color": "fuchsia",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "Pensylvania Railroad",
            "type": "property",
            "column": 1,
            "row": 6,
            "color": "black",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "St. James Place",
            "type": "property",
            "column": 1,
            "row": 5,
            "color": "gold",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "Community Chest",
            "type": "chest",
            "column": 1,
            "row": 4
        },
        {
            "name": "Tennessee Avenue",
            "type": "property",
            "column": 1,
            "row": 3,
            "color": "gold",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "New York Avenue",
            "type": "property",
            "column": 1,
            "row": 2,
            "color": "gold",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "Free Parking",
            "column": 1,
            "row": 1,
            "type": "parking"
        },
        {
            "name": "Kentucky Avenue",
            "type": "property",
            "column": 2,
            "row": 1,
            "color": "red",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "Chance",
            "type": "chance",
            "column": 3,
            "row": 1
        },
        {
            "name": "Indiana Avenue",
            "type": "property",
            "column": 4,
            "row": 1,
            "color": "red",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "Illinois Avenue",
            "type": "property",
            "column": 5,
            "row": 1,
            "color": "red",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "B & O Railroad",
            "type": "property",
            "column": 6,
            "row": 1,
            "color": "black",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "Atlantic Avenue",
            "type": "property",
            "column": 7,
            "row": 1,
            "color": "yellow",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "Ventnor Avenue",
            "type": "property",
            "column": 8,
            "row": 1,
            "color": "yellow",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "Water Works",
            "type": "property",
            "column": 9,
            "row": 1,
            "color": "black",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "Marvin Gardens",
            "type": "property",
            "column": 10,
            "row": 1,
            "color": "yellow",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "Go To Jail",
            "type": "goToJail",
            "column": 11,
            "row": 1
        },
        {
            "name": "Pacific Avenue",
            "type": "property",
            "column": 11,
            "row": 2,
            "color": "green",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "North Carolina Avenue",
            "type": "property",
            "column": 11,
            "row": 3,
            "color": "green",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "Community Chest",
            "type": "chest",
            "column": 11,
            "row": 4
        },
        {
            "name": "Pennsylvania Avenue",
            "type": "property",
            "column": 11,
            "row": 5,
            "color": "green",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "Short Line",
            "type": "property",
            "column": 11,
            "row": 6,
            "color": "black",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "Chance",
            "type": "chance",
            "column": 11,
            "row": 7
        },
        {
            "name": "Park Place",
            "type": "property",
            "column": 11,
            "row": 8,
            "color": "blue",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        },
        {
            "name": "Income Tax",
            "type": "tax",
            "column": 11,
            "row": 9,
            "amount": 100
        },
        {
            "name": "Boardwalk",
            "type": "property",
            "column": 11,
            "row": 10,
            "color": "deepink",
            "price": 50,
            "rent": [
                50,
                60,
                70,
                80,
                90,
                100
            ],
            "upgradeCost": [
                5,
                5,
                5,
                5,
                10
            ]
        }
        ];
    }
}