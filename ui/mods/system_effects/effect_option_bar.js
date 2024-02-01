
//currently this is just for adding a button to mute the draw effects
var systemArray = ["system_effects_on","system_effects_off"];
var systemCounter = 0;
var defaultSystemEffects = systemArray[systemCounter];
var System_bar = (function () {
		var System_bar = {};
		System_bar.chosenState = ko.observable(defaultSystemEffects);

	    return System_bar;
})();

base_path = "coui://ui/mods/system_effects/icons/"


var system_source = ko.computed(function(){
	
	return base_path +  System_bar.chosenState() + ".png";

}, self);

(function () {
    //adds a toggle for sounds to live_game action bar
	$(".div_ingame_options_bar_cont").prepend("<div class=\"btn_ingame_options div_ping_bar_cont\"><a href=\"#\" data-bind=\"click: function () {if(systemCounter<systemArray.length-1){systemCounter++}else{systemCounter = 0};System_bar.chosenState(systemArray[systemCounter]);api.Panel.message(api.Panel.parentId, 'muteSystemEffects','');}\"><img data-bind='attr : {src: system_source()}' /></a></div>");
	
})();
