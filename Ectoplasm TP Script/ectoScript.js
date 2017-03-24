var allItemIds;
var numAllItems;
var allItems;
var ectoItems = [];
var smallerArrays;
var ectoSell;


getAllItemIDs();




function getAllItemIDs(){
	jQuery.get( "https://api.guildwars2.com/v2/items.json", function( response ) { 
		allItemIds = response;
		numAllItems = allItemIds.length;
   		console.log(numAllItems);
   		getAllItemsWrapper();
	} );
}	


function getAllItemsWrapper(){
	smallerArrays = chunkify(allItemIds, 278, false);
	getAllItems(0);
}

function getAllItems(j){
	console.log(j);
	if(j == 277){ //max is 278
		getAllEctoItems();
	}
	else{
		var requestString = "https://api.guildwars2.com/v2/items?ids=";
		for(var i = (j*199); i < (j*199)+199; i++){
			requestString += allItemIds[i] += ",";
		}
		jQuery.get( requestString, function( response ) {
			if(j == 0){
				allItems = response;
			} 
			else{
				allItems = allItems.concat(response);
			}
			
	   		//console.log(response);
	   		getAllItems(j+1);
		} );
	}

		
	
	
}

function getAllEctoItems(){
	console.log(allItems);
	var l = allItems.length;
	for(var i = 0; i < l; i++){
		var type = allItems[i].type;
		var lvl = allItems[i].level;
		var rarity = allItems[i].rarity;
		var flags = allItems[i].flags;
		if((type == "Armor" || type == "Weapon" || type == "Trinket") &&
			(lvl >= 68)                                               &&
			(rarity == "Rare" || rarity == "Exotic")                  &&
			($.inArray("NoSalvage", flags) == -1)                     &&
			($.inArray("NoSell", flags) == -1)){
			//debugger;
				ectoItems.push(allItems[i]);
		}
	}
	console.log(ectoItems);
	getEctoSellCost();
}

function getEctoSellCost(){
	jQuery.get( "https://api.guildwars2.com/v2/commerce/listings/19721", function( response ) { 
		ectoSell = response.sells[0].unit_price;
		getProfitableItemsWrapper();
	} );
}

var amountOfEctoItems;
function getProfitableItemsWrapper(){
	amountOfEctoItems = ectoItems.length;
	assignBuyCosts(0);
}

function assignBuyCosts(j){
	if(j == amountOfEctoItems){
		filterAndSort();
	}
	else{
		$.ajax({
		type: "GET",
		url: "https://api.guildwars2.com/v2/commerce/listings/" + ectoItems[j].id,
		error: function(jqXHR, textStatus, errorThrown) {
			ectoItems[j].buyPrice = 9999999;
			assignBuyCosts(j+1);
		},
		success: function(response){
			if(response.sells[0] && response.sells[0].unit_price){
				ectoItems[j].buyPrice = response.sells[0].unit_price;
			}
			else{
				ectoItems[j].buyPrice = 9999999;
			}
			
			assignBuyCosts(j+1);
		}
		}
		);

	}

}

function filterAndSort(){
	console.log(ectoItems);
	ectoItems.sort(compare);
	console.log("Profitable Items:");
	for(var i = 0; i < amountOfEctoItems; i++){
		if((ectoItems[i].buyPrice * 1.14286) <= ectoSell){
			console.log("Name: " + ectoItems[i].name + " Profit: " + (ectoSell - ectoItems[i].buyPrice * 1.14286) * 0.85);
		}
	}
}

function compare(a,b){
	if(a.buyPrice < b.buyPrice){
		return -1;
	}
	if(a.buyPrice > b.buyPrice){
		return 1;
	}
	return 0;
}































function chunkify(a, n, balanced) {
    
    if (n < 2)
        return [a];

    var len = a.length,
            out = [],
            i = 0,
            size;

    if (len % n === 0) {
        size = Math.floor(len / n);
        while (i < len) {
            out.push(a.slice(i, i += size));
        }
    }

    else if (balanced) {
        while (i < len) {
            size = Math.ceil((len - i) / n--);
            out.push(a.slice(i, i += size));
        }
    }

    else {

        n--;
        size = Math.floor(len / n);
        if (len % size === 0)
            size--;
        while (i < size * n) {
            out.push(a.slice(i, i += size));
        }
        out.push(a.slice(size * n));

    }

    return out;
}