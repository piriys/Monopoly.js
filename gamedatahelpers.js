// TO DO:
// *Add ajax JSON loading & put these values into JSON
class GameDataHelpers {
    static loadChanceCards() {
        return [{
            "description": "Advance to Illinois Avenue",
            "icon": "🛫",
            "type": "moveto",
            "nameId": "illinois_avenue",
            "resolveSpace": false,
            "collectPassGo": true
        },
        {
            "description": "Advance to St. Charles Place",
            "icon": "🛫",
            "type": "moveto",
            "nameId": "st_charles_place",
            "resolveSpace": false,            
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
            "nextId": "mediteranean_avenue",
            "prevId": "boardwalk",
            "nameId": "start",
            "name": "Go",
            "type": "start",
            "column": 11,
            "row": 11
        },
        {
            "nextId": "community_chest_1",
            "prevId": "start",
            "nameId": "mediteranean_avenue",
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
            "nextId": "baltic_avenue",
            "prevId": "mediteranean_avenue",
            "nameId": "community_chest_1",            
            "name": "Community Chest",
            "type": "chest",
            "column": 9,
            "row": 11
        },
        {
            "nextId": "income_tax_1",
            "prevId": "community_chest_1",
            "nameId": "baltic_avenue",               
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
            "nextId": "reading_railroad",
            "prevId": "baltic_avenue",
            "nameId": "income_tax_1",               
            "name": "Income Tax",
            "type": "tax",
            "column": 7,
            "row": 11,
            "amount": 200
        },
        {
            "nextId": "oriental_avenue",
            "prevId": "income_tax_1",
            "nameId": "reading_railroad",                
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
            "nextId": "chance_1",
            "prevId": "reading_railroad",
            "nameId": "oriental_avenue",            
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
            "nextId": "vermont_avenue",
            "prevId": "oriental_avenue",
            "nameId": "chance_1",              
            "name": "Chance",
            "type": "chance",
            "column": 4,
            "row": 11
        },
        {
            "nextId": "connecticut_avenue",
            "prevId": "chance_1",
            "nameId": "vermont_avenue",              
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
            "nextId": "jail",
            "prevId": "vermont_avenue",
            "nameId": "connecticut_avenue",              
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
            "nextId": "st_charles_place",
            "prevId": "connecticut_avenue",
            "nameId": "jail",                
            "name": "Jail",
            "type": "jail",
            "column": 1,
            "row": 11
        },
        {
            "nextId": "electric_company",
            "prevId": "jail",
            "nameId": "st_charles_place",                
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
            "nextId": "states_avenue",
            "prevId": "st_charles_place",
            "nameId": "electric_company",              
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
            "nextId": "virginia_avenue",
            "prevId": "electric_company",
            "nameId": "states_avenue",            
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
            "nextId": "pensylvania_railroad",
            "prevId": "states_avenue",
            "nameId": "virginia_avenue",               
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
            "nextId": "st_james_place",
            "prevId": "virginia_avenue",
            "nameId": "pensylvania_railroad",              
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
            "nextId": "community_chest_2",
            "prevId": "pensylvania_railroad",
            "nameId": "st_james_place",                
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
            "nextId": "tennessee_avenue",
            "prevId": "st_james_place",
            "nameId": "community_chest_2",             
            "name": "Community Chest",
            "type": "chest",
            "column": 1,
            "row": 4
        },
        {
            "nextId": "new_york_avenue",
            "prevId": "community_chest_2",
            "nameId": "tennessee_avenue",              
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
            "nextId": "free_parking",
            "prevId": "tennessee_avenue",
            "nameId": "new_york_avenue",              
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
            "nextId": "kentucky_avenue",
            "prevId": "new_york_avenue",
            "nameId": "free_parking",                 
            "name": "Free Parking",
            "column": 1,
            "row": 1,
            "type": "parking"
        },
        {
            "nextId": "chance_2",
            "prevId": "free_parking",
            "nameId": "kentucky_avenue",              
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
            "nextId": "indiana_avenue",
            "prevId": "kentucky_avenue",
            "nameId": "chance_2",              
            "name": "Chance",
            "type": "chance",
            "column": 3,
            "row": 1
        },
        {
            "nextId": "illinois_avenue",
            "prevId": "chance_2",
            "nameId": "indiana_avenue",            
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
            "nextId": "b_and_o_railroad",
            "prevId": "indiana_avenue",
            "nameId": "illinois_avenue",                  
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
            "nextId": "atlantic_avenue",
            "prevId": "illinois_avenue",
            "nameId": "b_and_o_railroad",
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
            "nextId": "ventnor_avenue",
            "prevId": "b_and_o_railroad",
            "nameId": "atlantic_avenue",            
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
            "nextId": "water_works",
            "prevId": "atlantic_avenue",
            "nameId": "ventnor_avenue",              
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
            "nextId": "marvin_gardens",
            "prevId": "ventnor_avenue",
            "nameId": "water_works",                  
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
            "nextId": "go_to_jail",
            "prevId": "water_works",
            "nameId": "marvin_gardens",                
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
            "nextId": "pacific_avenue",
            "prevId": "marvin_gardens",
            "nameId": "go_to_jail",                 
            "name": "Go To Jail",
            "type": "goToJail",
            "column": 11,
            "row": 1
        },
        {
            "nextId": "north_carolina_avenue",
            "prevId": "go_to_jail",
            "nameId": "pacific_avenue",              
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
            "nextId": "community_chest_3",
            "prevId": "pacific_avenue",
            "nameId": "north_carolina_avenue",              
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
            "nextId": "pennsylvania_avenue",
            "prevId": "north_carolina_avenue",
            "nameId": "community_chest_3",              
            "name": "Community Chest",
            "type": "chest",
            "column": 11,
            "row": 4
        },
        {
            "nextId": "short_line",
            "prevId": "community_chest_3",
            "nameId": "pennsylvania_avenue",      
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
            "nextId": "chance_3",
            "prevId": "pennsylvania_avenue",
            "nameId": "short_line",
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
            "nextId": "park_place",
            "prevId": "short_line",
            "nameId": "chance_3",            
            "name": "Chance",
            "type": "chance",
            "column": 11,
            "row": 7
        },
        {
            "nextId": "income_tax_2",
            "prevId": "chance_3",
            "nameId": "park_place",                 
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
            "nextId": "boardwalk",
            "prevId": "park_place",
            "nameId": "income_tax_2",   
            "name": "Income Tax",
            "type": "tax",
            "column": 11,
            "row": 9,
            "amount": 100
        },
        {
            "nextId": "start",
            "prevId": "income_tax",
            "nameId": "boardwalk",
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