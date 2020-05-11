function roll6() {
    return Math.floor(Math.random() * 6) + 1;
}
var messageCount = 0;

// SEASON
var daily = {
    chickens: false,
    cows: false,
    fish: false,
    // berries: false,
    honey: false
}
var monthly = {
    stocks: false,
    sheep: false
}
function resetDaily() {
    Object.keys(daily).forEach(key => {
        daily[key] = false;
    })
    messageCount = 0;
    message.text("Nothing's happened yet today.");
}
function resetMonthly() {
    Object.keys(monthly).forEach(key => {
        monthly[key] = false;
    });
}
var season = [1,1];
function updateDate() {
    resetDaily();
    if (season[1] < 4) {
        season[1]++;
    } else {
        season[1] = 1;
        resetMonthly();
        if (season[0] < 4) {
            season[0]++;
        } else {
            season[0] = 1;
        }
    }
    displayDate();
}
function displayDate() {
    var currentSeason;
    switch (season[0]) {
        case 1:
            currentSeason = "Spring";
            break;
        case 2:
            currentSeason = "Summer";
            break;
        case 3:
            currentSeason = "Fall"
            break;
        case 4:
            currentSeason = "Winter";
            break;

    }
    $("span#date").text("Day " + season[1] + " of " + currentSeason);
}
displayDate();
// MONEY
var money = 0;
function updateMoney() {
    $("#money").text(money);
}
updateMoney();
function changeMoney() {
    var changeAmount = Number($("#change-money-amount").val());
    if (changeAmount < 0) {
        if (Math.abs(changeAmount) > money) {
            changeMessage("ERROR: You do not have enough money in your holdings account to withdraw.");
        } else {
            money = money + changeAmount;
            updateMoney();
        }
    } else {
        money = money + changeAmount;
        updateMoney();
    }
    
}
function changeHoldings() {
    var changeHoldingsAmount = Number($("#change-holdings-amount").val());
    if (changeHoldingsAmount < 0) {
        if (Math.abs(changeHoldingsAmount) > myHoldings) {
            changeMessage("ERROR: you do not have enough money in your holdings account to withdraw.");
        } else {
            myHoldings = myHoldings + changeHoldingsAmount;
            money = money - changeHoldingsAmount;
            console.log("yay");
        }
    } else {
        if (changeHoldingsAmount > money) {
            changeMessage("ERROR: you do not have enough money in your account to add to holdings.");
        } else {
            money = money - changeHoldingsAmount;
            myHoldings = myHoldings + changeHoldingsAmount;
            changeMessage("Added " + changeHoldingsAmount + " to stock market holdings.");
        }
    }
    updateMoney();
    updateHoldings();
}
// message

var message = $("div#message");
function changeMessage(msg) {
        if (messageCount > 9) {
            message.text(msg);
            messageCount = 1;
        } else {
            message.append("<br>" + msg );
            messageCount++;
        }
   
}

// STOCK MARKET

var myHoldings = 0;
function updateHoldings() {
    $("span#holdings").text(myHoldings);
}
updateHoldings();
function stockMarket(holdings) {
    if (monthly.stocks == false) {
        var roll = roll6();
        switch (roll) {
            case 1:
                // lose 1/8
                holdings = Math.floor(holdings - (holdings * .125));
                changeMessage("Lost 1/8");
                break;
            case 2:
                // gain 1/4
                holdings = Math.floor(holdings * 1.25);
                changeMessage("Gained 1/4");
                break;
            case 3:
                // even: -1/2; odd: 2.0
                if (roll6() % 2) {
                    holdings = Math.floor(holdings - (holdings * .5));
                    changeMessage("Lost 1/2");
                } else {
                    holdings = Math.floor(holdings * 2);
                    changeMessage("Gained x2");
                }
                break;
            case 4:
                // gain 1/8
                holdings = Math.floor(holdings * 1.125);
                changeMessage("Gained 1/8");
                break;
            case 5:
                // gain 1/2
                holdings = Math.floor(holdings * 1.5);
                changeMessage("Gained 1/2");
                break;
            case 6:
                // lose 1/4
                holdings = Math.floor((holdings - (holdings * .25)));
                changeMessage("Lost 1/4");
                break;
        }
        holdings = holdings + 1;
        monthly.stocks = true;
        myHoldings = holdings;
        updateHoldings();
    } else {
        changeMessage("Already ran stock market for this month!");
    }
}

var products = {
    wheat: 0,
    corn: 0,
    sugarcane: 0,
    potatoes: 0,
    // berries: 0,
    honey: 0,
    fish: 0,
    ice: 0,
    eggs: 0,
    milk: 0,
    wool: 0
}


// products

function checkChickens() {  
    return Math.floor(Math.random() * 3) + 1;
}
function chickens() {
    products.eggs = products.eggs + checkChickens();
    changeMessage("You have " + products.eggs + " egg(s).");
    updateStorehouse();
}

function checkCows() {
    if (roll6() >= 3) {
        return 1;
    } else {
        return 0;
    }
    // return (Math.floor(Math.random() * 3) + 1)*2;
}
function cows() {
    products.milk = products.milk + checkCows();
    changeMessage("You have " + products.milk + " milk.");
    updateStorehouse();
}

function checkSheep() {
    if (season[0] ==  1){
        return roll6();
    } else {
    }
}
function sheep() {
    var newWool = checkSheep();
    if (season[0] == 1) {
        products.wool = products.wool + newWool;
        changeMessage("You gained " + newWool + " wool.");
        updateStorehouse();
    } else {
        changeMessage("It isn't spring yet.");
    }
   
}

// products

function wheat() {
    products.wheat++;
    changeMessage("Harvested 1 wheat.");
    updateStorehouse();

}
function corn() {
    products.corn++;
    changeMessage("Harvested 1 corn.");
    updateStorehouse();
}
function sugarcane() {
    products.sugarcane++;
    changeMessage("Harvested 1 sugarcane.");
    updateStorehouse();
}
function potatoes() {
    products.potatoes++;
    changeMessage("Harvested 1 potato.");
    updateStorehouse();
}
// function berries() {
//     if (roll6() % 2) {
//         products.berries++;
//         changeMessage("Harvested 1 berries.");
//     } else {
//         changeMessage("Harvested no berries.");
//     }
//     updateStorehouse();
// }
function honey() {
    if (roll6() <= 2) {
        products.honey++;
        changeMessage("Harvested 1 honey.");
    } else {
        changeMessage("Harvested no honey.");
    }
    updateStorehouse();
}
function fish() {
    if (roll6() <= 4) {
        products.fish++;
        changeMessage("Harvested 1 fish.");
    } else {
        changeMessage("Harvested no fish.");
    }
    updateStorehouse();
}
function ice() {
    products.ice++;
    changeMessage("Harvested 1 ice.");
    updateStorehouse();
}

// STOREHOUSE
var storehouse = $("ul#storehouse");

function updateStorehouse() {
    storehouse.html("");
    for (var i = 0; i < Object.keys(products).length; i++) {
        storehouse.append("<li>" + Object.keys(products)[i] + ": " + Object.values(products)[i] + "</li>")
    }
}
updateStorehouse();

// SELLING

function sell() {
    var amountSold = Number($("#amount-sold").val());
    var itemSold = $("#item-sold").val();
    var profit = 0;
    if (amountSold > products[itemSold]) {
        changeMessage("ERROR: Not enough " + itemSold + " in inventory to sell!");
    } else {
        profit = prices[season[0] - 1][itemSold] * amountSold;
        products[itemSold] = products[itemSold] - amountSold;
        changeMessage("Sold " + amountSold + " " + itemSold + " for " + profit);
        updateStorehouse();
        money = money + profit;
        updateMoney();
    }
}
var prices = [{
    wheat: 3,
    corn: 2,
    sugarcane: 3,
    potatoes: 3,
    // berries: 2, 
    honey: 3, 
    fish: 4,
    ice: 3,
    eggs: 1,
    milk: 3,
    wool: 6
},
{
    wheat: 2,
    corn: 3,
    sugarcane: 1,
    potatoes: 3,
    // berries: 5, 
    honey: 4, 
    fish: 1,
    ice: 6,
    eggs: 1,
    milk: 3,
    wool: 6
},
{
    wheat: 1,
    corn: 1,
    sugarcane: 1,
    potatoes: 3,
    // berries: 3, 
    honey: 4, 
    fish: 2,
    ice: 1,
    eggs: 1,
    milk: 3,
    wool: 6
}, {
    wheat: 2,
    corn: 2,
    sugarcane: 4,
    potatoes: 4,
    // berries: 6, 
    honey: 4, 
    fish: 3,
    ice: 0,
    eggs: 1,
    milk: 3,
    wool: 6
}];

// hide money stuff
function hideMoney() {
    if ($("#shop").hasClass("hidden")) {
        $("#left").toggleClass("blur");
        $("#right").toggleClass("blur");
        $("#change-money").toggleClass("hidden");
    }
    else {
        hideShop();
        $("#left").toggleClass("blur");
        $("#right").toggleClass("blur");
        $("#change-money").toggleClass("hidden");
    }
}
// hide shop stuff
function hideShop() {  
    if ($("#change-money").hasClass("hidden")) {
        $("#left").toggleClass("blur");
        $("#right").toggleClass("blur");
        $("#shop").toggleClass("hidden");
    }
    else {
        hideMoney();
        $("#left").toggleClass("blur");
        $("#right").toggleClass("blur");
        $("#shop").toggleClass("hidden");
    }
}

// buy
var buyPrices = {
    "wheat": 2,
    "corn": 4,
    "sugar": 10,
    "potatoes": 10,
    // "berries": 20,
    "honey": 12,
    "fish": 15,
    "ice": 15,
    "chicken": 25,
    "sheep": 10,
    "foal": 15,
    "cow": 40
}
function buy(item) {
    if (buyPrices[item] <= money) {
        if (item == "sheep") {
            changeMessage("Baaaaaad! No buying Sheep in winter!");
            return;
        }
        money = money - buyPrices[item];
        changeMessage("You bought 1 " + item + " seed.");
        inventory[item]++;
        updateMoney();
    } else {
        changeMessage("You don't have enough money to buy that");
    }
    updateInventory();
}

// inventory
var inventory = {
    "wheat": 0,
    "corn": 0,
    "sugar": 0,
    "potatoes": 0,
    // "berries": 0,
    "honey": 0,
    "fish": 0,
    "ice": 0,
    "chickens": 0,
    "sheep": 0,
    "foals": 0,
    "cows": 0
}

var inventoryUl = $("ul#inventory");

function updateInventory() {
    inventoryUl.html("");
    for (var i = 0; i < Object.keys(inventory).length; i++) {
        inventoryUl.append("<li>" + Object.keys(inventory)[i] + ": " + Object.values(inventory)[i] + "</li>")
    }
}
updateInventory();