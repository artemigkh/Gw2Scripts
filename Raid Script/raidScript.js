var openableBosses = [];
var numMembers = members.length;
var API_STRING = "https://api.guildwars2.com/v2/account/raids?access_token=";

findOpenableBosses(0);

function findOpenableBosses(i){
	if(i == numMembers){
		outputToDOM();
	} else {
		jQuery.get( API_STRING + members[i][1], function( response ) { 
			findWingOneBoss();
			findWingTwoBoss();
			findWingThreeBoss();
			findWingFourBoss();
			findOpenableBosses(i + 1);
		} );
	}
}

function outputToDOM(){
	console.log(openableBosses);
}

function findWingOneBoss(){

}
function findWingTwoBoss();
function findWingThreeBoss();
function findWingFourBoss();