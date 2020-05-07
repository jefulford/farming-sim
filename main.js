function roll6() {
    return Math.floor(Math.random() * 6) + 1;
}

// SEASON
var daily = {
    stocks: false,
    chickens: false,
    cows: false,
    fish: false
}
var monthly = {
    sheep: false,
    berries: false,
    honey: false
}
function resetDaily() {
    Object.keys(daily).forEach(key => {
        daily[key] = false;
    })
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
    var changeAmount= Number($("#change-money-amount").val());
    money = money + changeAmount;
    updateMoney();
}

// message

var message = $("div#message");
function changeMessage(msg) {
    message.append("<br>" + msg );
}

// STOCK MARKET

var myHoldings = 0;
function updateHoldings() {
    $("span#holdings").text(myHoldings);
}
updateHoldings();
function stockMarket(holdings) {
    if (daily.stocks == false) {
        var roll = roll6();
        switch (roll) {
            case 1:
                // lose 1/8
                holdings = Math.floor(holdings - (holdings * .125));
                console.log("Lost 1/8");
                break;
            case 2:
                // gain 1/4
                holdings = Math.floor(holdings * 1.25);
                console.log("Gained 1/4");
                break;
            case 3:
                // even: -1/2; odd: 2.0
                if (roll6() % 2) {
                    holdings = Math.floor(holdings - (holdings * .5));
                    console.log("Lost 1/2");
                } else {
                    holdings = Math.floor(holdings * 2);
                    console.log("Gained x2");
                }
                break;
            case 4:
                // gain 1/8
                holdings = Math.floor(holdings * 1.125);
                console.log("Gained 1/8");
                break;
            case 5:
                // gain 1/2
                holdings = Math.floor(holdings * 1.5);
                console.log("Gained 1/2");
                break;
            case 6:
                // lose 1/4
                holdings = Math.floor((holdings - (holdings * .25)));
                console.log("Lost 1/4");
                break;
        }
        holdings = holdings + 1;
        daily.stocks = true;
        changeMessage("Holdings now at " + holdings);
        myHoldings = holdings;
        updateHoldings();
    } else {
        changeMessage("Already ran stock market for today!");
    }
}

var products = {
    wheat: 0,
    corn: 0,
    sugarcane: 0,
    potatoes: 0,
    berries: 0,
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
    return (Math.floor(Math.random() * 3) + 1)*2;
}
function cows() {
    products.milk = products.milk + checkCows();
    changeMessage("You have " + products.milk + " milk.");
    updateStorehouse();
}

function checkSheep() {
    return Math.floor(Math.random() * 6);
}
function sheep() {
    products.wool = products.wool + checkSheep();
    changeMessage("You have " + products.wool + " wool.");
    updateStorehouse();
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
function berries() {
    if (roll6() % 2) {
        products.berries++;
        changeMessage("Harvested 1 berries.");
    } else {
        changeMessage("Harvested no berries.");
    }
    updateStorehouse();
}
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
    berries: 2, 
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
    berries: 5, 
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
    berries: 3, 
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
    berries: 6, 
    honey: 4, 
    fish: 3,
    ice: 0,
    eggs: 1,
    milk: 3,
    wool: 6
}];