model.effectPuppetArray = {};// an object containing all spawned puppets keyed to the id's

try {
    model.chosenSystemDetails = JSON.parse(localStorage.systemEffectSettings)
} catch (error) {
    model.chosenSystemDetails = undefined
}

if(model.chosenSystemDetails == undefined){
	model.chosenSystemDetails = {
		"enabled":true,
		"effectLimitPerBiomeType":1.0,
		"maxAmount":16,
		"sunChance":1.0,
		"gasChance":1.0,
		"asteroidChance":1.0,
		"lavaChance":1.0,
		"moonChance":1.0,
		"earthChance":1.0,
		"tropicalChance":1.0,
		"iceChance":1.0,
		"desertChance":1.0,
		"metalChance":1.0
	}
}

model.isHost = ko.observable().extend({session:'isHost'});

try {
    model.currentSystemEffects = ko.observable(JSON.parse(localStorage.currentSystemEffects));
} catch (error) {
    model.currentSystemEffects = ko.observable(undefined)
}


model.systemPfxMap = undefined;
$.getJSON('coui:/mods/system_effects/pfx/system_pfx_map.json').then(function(result) {
model.systemPfxMap = result;
})

model.csgUISettings = {//testing settings
	orientation:undefined,
	selectedAnim:"NONE",
	selectedUnit:"/pa/units/land/assault_bot/assault_bot.json", 
	selectedEffect:"/pa/effects/specs/ping.pfx", 
	effectBone:"bone_root",
	boneOffset:[0,0,0], 
	boneOrient:[0,0,0], 
	useUnit:false,
	useEffect:true,
	useUnitEffects:false,
	autoDelete:false,
	timedDelete:false,
	timedReset:false,
	refreshOnFileChange:false,
	useLastEffectPath:false,
	refreshOnSettingsChange:false,
	deleteResetDuration:3,
	autoDeleteAmount:10,
	snap:0,
	scale:1,
	travelSpeed:10,

}

model.createPuppet = function(settingsObject,planetId,puppetLocation){
    api.effectPuppet.createEffectPuppet(settingsObject,planetId,puppetLocation);
}

function pointDistance(point1,point2){
	var a = point2[0] - point1[0];
	var b = point2[1] - point1[1];
	var c = point2[2] - point1[2];

	var distance = Math.sqrt(a * a + b * b + c * c)
	console.log(distance)
	return distance;
}

function getRandomInt(min, max, randomNeg) {

	var number = Math.floor(min + Math.random() * (max-min));
	if(randomNeg == true){number *= Math.round(Math.random()) ? 1 : -1;}
	return number
}

model.spawnPlanetEffects = function(planetId, planetBiome, planetRadius){
    console.log("spawning effects for planet ",planetId)
	console.log(planetBiome)
	
		if(model.systemPfxMap[planetBiome] !== undefined){
			var possibleEffects = model.systemPfxMap[planetBiome];
			if(possibleEffects == undefined){return}
			if(possibleEffects.effectList == undefined){return}
			var effectCount = possibleEffects.effectList.length
			var randomEffectSelection = getRandomInt(0, effectCount)
			var chosenEffect = possibleEffects.effectList[randomEffectSelection]
			if(chosenEffect.number == undefined){chosenEffect.number = 1}
			if(chosenEffect.minDistance == undefined){chosenEffect.minDistance = 0}
			for(i = 0; i< chosenEffect.number;i++){
			var pos = [
				getRandomInt(chosenEffect.offsetRange[0][0],chosenEffect.offsetRange[0][1],true),
				getRandomInt(chosenEffect.offsetRange[1][0],chosenEffect.offsetRange[1][1],true),
				getRandomInt(chosenEffect.offsetRange[2][0],chosenEffect.offsetRange[2][1],true)
			]
			if(pointDistance([0,0,0],pos)<chosenEffect.minDistance){i--;continue}
			var scale = chosenEffect.effectScaleDefault*(planetRadius/chosenEffect.effectScaleRadius)
			console.log("spawning below effect for "+planetBiome+" planet at "+pos +" with scale of "+scale)
			console.log(chosenEffect)
			var location = {
				"planet":planetId || 0,
				"pos": pos,
				"orient":[0,0,0],
				"scale":scale
			
			}
			if(chosenEffect.randomOrientation == true){location.orient = [getRandomInt(0,360),getRandomInt(0,360),getRandomInt(0,360)]}
			var settings = JSON.parse(JSON.stringify(model.csgUISettings));
			settings.selectedEffect = chosenEffect.effectPath;
			

			chatObject = {
				uberId:model.uberId(),
				settings:settings,
				planetId:planetId,
				location:location
			}
			model.send_message("chat_message", {message: ("SystemEffect:"+JSON.stringify(chatObject))});}
		
		}
		else{
			console.log("non defined biome")
		}
	
}

model.spawnSystemEffects = function(){

	
	if(model.refreshCheck() == false){
	var planets = model.planetListState().planets
	var effectsPerBiome = {}
    console.log("spawning System CSG effects")
	console.log(planets)
	for(var i = 0; i < planets.length;i++){
		var planetBiome = planets[i].biome;
		if(planetBiome == "earth" && planets[i].temprature < 0.5){ planetBiome = "ice"}
		if(planets[i].isSun == true){
			planetBiome = 'sun'
		}
		var biomeChanceKey = planetBiome+"Chance"
		var planetRadius = planets[i].radius;

		var randomNum = getRandomInt(0,100);
		if(effectsPerBiome[planetBiome] == undefined){effectsPerBiome[planetBiome] = 0}
		if(model.chosenSystemDetails[biomeChanceKey]*100 > randomNum && effectsPerBiome[planetBiome] < model.chosenSystemDetails.effectLimitPerBiomeType){
			effectsPerBiome[planetBiome] += 1;
			model.spawnPlanetEffects(i, planetBiome, planetRadius);
		}
	}}
}

model.spawnPuppetsAfterSpawn = function(delay){
	//console.log("spawn puppets after spawn")
	if((model.isSpectator() == true || model.maxEnergy() > 0) && model.timeBarState().minValidTime !== -1){
		if(model.isHost() == true){
		_.delay(model.spawnSystemEffects,delay)
		}
		else{
			if(model.refreshCheck() == false){return}
		}
	}
	else{
		_.delay(model.spawnPuppetsAfterSpawn,100,2000)
	}
}



//toggles system effects mode
model.systemEffectsEnabled = true;

//checks if existing effects were a thing and respawns them if that is the case
model.refreshCheck = function(){
	if(localStorage.currentSystemEffects !== undefined && localStorage.currentSystemEffects !== "undefined"){
		var effects = JSON.parse(localStorage.currentSystemEffects)
		var effectKeys = _.keys(effects)
		for(var i = 0; i < effectKeys.length; i++){
			var payload = effects[effectKeys[i]]
			model.createPuppet(payload.settings,payload.planetId,payload.location)
		}
		return true;
	} 
	else{return false}
}

handlers.systemEffect = function(payload){

	payload = JSON.parse(payload);
    //if(payload.uberId == model.uberId()){return} //removed since now all players ignore more than necessary effect requests
	if(model.currentSystemEffects() == undefined){model.currentSystemEffects = ko.observable({})}

	//what I am after logically is, when player gets a systemEffect request they ignore it unless they do not have spawned effects already, for that to be the case I need to include the planet or id

	//currentSystemEffects is basically a record of the active effects they had in case of restart/refresh, it will be checked against actual effects in a delayed function and then spawn them
	
	
	if(model.currentSystemEffects()[payload.planetId] == undefined){
	model.currentSystemEffects()[payload.planetId] = payload;
	localStorage.currentSystemEffects = JSON.stringify(model.currentSystemEffects());
	model.createPuppet(payload.settings,payload.planetId,payload.location);
	}
	
}

handlers.muteSystemEffects = function(){
	if(model.systemEffectsEnabled == true){
		api.effectPuppet.killAllPuppets();
		model.systemEffectsEnabled = false;
	}
	else{
		model.spawnPuppetsAfterSpawn(100);
		model.systemEffectsEnabled = true;
	}
}

model.spawnPuppetsAfterSpawn(2000);