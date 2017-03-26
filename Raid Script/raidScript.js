var openableBosses = [];
var numMembers = members.length;
var API_STRING = "https://api.guildwars2.com/v2/account/raids?access_token=";
var bossesList = ["vale_guardian", "gorseval", "sabetha", "slothasor", "bandit_trio", "matthias", "escort", "keep_construct", "xera", "cairn", "mursaat_overseer", "samarog", "deimos"];
var bossesListHR = ["Value Guardian", "Gorseval", "Sabetha", "Slothasor", "Bandit Trio", "Matthias", "Escort", "Keep Construct", "Xera", "Cairn", "Mursaat Overseer", "Samarog", "Deimos"];
var requiredBosses = [];

start();

function start(){
	initializeRequiredBosses();
	processApiData(0);
}

function processApiData(i){
	if(i == numMembers){
		outputToDOM();
	} else {
		jQuery.get( API_STRING + members[i][1], function( response ) { 
			findWingOneBoss(response, members[i][0]);
			findWingTwoBoss(response, members[i][0]);
			findWingThreeBoss(response, members[i][0]);
			findWingFourBoss(response, members[i][0]);
			updateUnclearedBosses(response, members[i][0]);
			processApiData(i + 1);
		} );
	}
}


function findWingOneBoss(bosses, member){
	//vale guard, spirit woods, gors, sab
	var cleared = [false,false,false,false]
	for(var j = 0; j < bosses.length; j++){
		var boss = bosses[j];
		if(boss == "vale_guardian"){
			cleared[0] = true;
		} else if (boss == "spirit_woods") {
			cleared[1] = true;
		} else if (boss == "gorseval") {
			cleared[2] = true;
		} else if (boss == "sabetha") {
			cleared[3] = true;
		}
	}

	if(!cleared[0]) {
		openableBosses.push(["vale_guardian", member]);
		return;
	} else if (!cleared[1]) {
		openableBosses.push(["spirit_woods", member]);
		return;
	} else if (!cleared[2]) {
		openableBosses.push(["gorseval", member]);
		return;
	} else if (!cleared[3]) {
		openableBosses.push(["sabetha", member]);
		return;
	}
}
function findWingTwoBoss(bosses, member){
	//sloth, trio, matt
	var cleared = [false, false, false];
	for(var j = 0; j < bosses.length; j++){
		var boss = bosses[j];
		if(boss == "slothasor") {
			cleared[0] = true;
		} else if (boss == "bandit_trio") {
			cleared[1] = true;
		} else if (boss == "matthias") {
			cleared[2] = true;
		}
	}

	if(!cleared[0]) {
		openableBosses.push(["slothasor", member]);
		return;
	} else if(!cleared[1]) {
		openableBosses.push(["bandit_trio", member]);
		return;
	} else if(!cleared[2]) {
		openableBosses.push(["matthias", member]);
		return;
	}
}
function findWingThreeBoss(bosses, member){
	//escort, kc, castle, xera
	var cleared = [false, false, false, false];
	for(var j = 0; j < bosses.length; j++){
		var boss = bosses[j];
		if(boss == "escort") {
			cleared[0] = true;
		} else if (boss == "keep_construct") {
			cleared[1] = true;
		} else if (boss == "twisted_castle") {
			cleared[2] = true;
		} else if (boss == "xera") {
			cleared[3] = true;
		}
	}

	if(!cleared[0]) {
		openableBosses.push(["escort", member]);
		return;
	} else if (!cleared[1]) {
		openableBosses.push(["keep_construct", member]);
		return;
	} else if (!cleared[2]) {
		openableBosses.push(["twisted_castle", member]);
		return;
	} else if (!cleared[3]) {
		openableBosses.push(["xera", member]);
		return;
	}
}
function findWingFourBoss(bosses, member){
	//cairn, mo, sam, deim
	var cleared = [false, false, false, false];
	for(var j = 0; j < bosses.length; j++){
		var boss = bosses[j];
		if(boss == "cairn") {
			cleared[0] = true;
		} else if (boss == "mursaat_overseer") {
			cleared[1] = true;
		} else if (boss == "samarog") {
			cleared[2] = true;
		} else if (boss == "deimos") {
			cleared[3] = true;
		}
	}

	if(!cleared[0]) {
		openableBosses.push(["cairn", member]);
		return;
	} else if (!cleared[1]) {
		openableBosses.push(["mursaat_overseer", member]);
		return;
	} else if (!cleared[2]) {
		openableBosses.push(["samarog", member]);
		return;
	} else if (!cleared[3]) {
		openableBosses.push(["deimos", member]);
		return;
	}
}

function outputToDOM(){
	outputOpenersToDOM();
	outputRequiredBossesToDOM();
}

function outputOpenersToDOM(){
	var bosses = [];
	var openers = [];
	for(var k = 0; k < openableBosses.length; k++){
		var index = bosses.indexOf(openableBosses[k][0]);
		if(index == -1){
			bosses.push(openableBosses[k][0]);
			openers.push([openableBosses[k][1]]);
		} else {
			openers[index].push(openableBosses[k][1]);
		}
	}

	var wing1table = document.getElementById("wing1table");
	addOpenerRow(wing1table, "vale_guardian", "Vale Guardian", bosses, openers);
	addOpenerRow(wing1table, "spirit_woods", "Spirit Woods", bosses, openers);
	addOpenerRow(wing1table, "gorseval", "Gorseval", bosses, openers);
	addOpenerRow(wing1table, "sabetha", "Sabetha", bosses, openers);

	var wing2table = document.getElementById("wing2table");
	addOpenerRow(wing2table, "slothasor", "Slothasor", bosses, openers);
	addOpenerRow(wing2table, "bandit_trio", "Bandit Trio", bosses, openers);
	addOpenerRow(wing2table, "matthias", "Matthias", bosses, openers);

	var wing3table = document.getElementById("wing3table");
	addOpenerRow(wing3table, "escort", "Escort", bosses, openers);
	addOpenerRow(wing3table, "keep_construct", "Keep Construct", bosses, openers);
	addOpenerRow(wing3table, "twisted_castle", "Twisted Castle", bosses, openers);
	addOpenerRow(wing3table, "xera", "Xera", bosses, openers);

	var wing4table = document.getElementById("wing4table");
	addOpenerRow(wing4table, "cairn", "Cairn", bosses, openers);
	addOpenerRow(wing4table, "mursaat_overseer", "Mursaat Overseer", bosses, openers);
	addOpenerRow(wing4table, "samarog", "Samarog", bosses, openers);
	addOpenerRow(wing4table, "deimos", "Deimos", bosses, openers);
}

function addOpenerRow(table, bossId, bossName, bosses, openers) {
	var index = bosses.indexOf(bossId);
	if(index != -1){
		var bossOpeners = "";
		for(var l = 0; l < openers[index].length; l++){
			bossOpeners += openers[index][l];
			if(l != openers[index].length - 1){
				bossOpeners += ", "
			}
		}
		table.insertAdjacentHTML( 'beforeend', "<tr><td>" + bossName + "</td><td>" + bossOpeners + "</td></tr>");
	}
}

function initializeRequiredBosses() {
	for(var a = 0; a < bossesList.length; a++){
		requiredBosses.push([bossesList[a], 0, []]);
	}
}

function findUnclearedBosses(unclB) {
	return bossesList.filter( function( el ) {
	  return !unclB.includes( el );
	} );
}

function updateUnclearedBosses(currMemberBosses, member){
	unlcearedBosses = findUnclearedBosses(currMemberBosses);
	for(var a = 0; a < unlcearedBosses.length; a++){
		requiredBosses[bossesList.indexOf(unlcearedBosses[a])][1]++;
		requiredBosses[bossesList.indexOf(unlcearedBosses[a])][2].push(member);
	}
}

function outputRequiredBossesToDOM(){
	requiredBosses = requiredBosses.sort(compare);
	table = document.getElementById("reqBossesTable");
	for(var a = 0; a < requiredBosses.length; a++){
		membersTR = "";
		for(var l = 0; l < requiredBosses[a][2].length; l++){
			membersTR += requiredBosses[a][2][l];
			if(l != requiredBosses[a][2].length - 1){
				membersTR += ", "
			}
		}
		var row = table.insertRow();
		row.insertCell(0).innerHTML = bossesListHR[bossesList.indexOf(requiredBosses[a][0])];
		row.insertCell(1).innerHTML = requiredBosses[a][1];
		row.insertCell(2).innerHTML = membersTR;
	}

}

function compare(a, b){
	if(a[1] < b[1]){
		return 1;
	}
	if(a[1] > b[1]){
		return -1;
	}
	return 0;
}
