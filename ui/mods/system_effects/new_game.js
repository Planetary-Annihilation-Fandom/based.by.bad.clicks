


try {
    model.systemEffectSettings = JSON.parse(localStorage.systemEffectSettings)
} catch (error) {
    model.systemEffectSettings = undefined
}

localStorage.currentSystemEffects = undefined;

model.isHost = ko.observable().extend({session:'isHost'});

var isHost = function(){model.isHost(model.isGameCreator())}
//var ice = planet.biome === 'earth' && planet.temperature <= -0.5;

_.delay(isHost, 3000);

var baseSystemEffectSettings = {
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

function effectSettingsModel(){
    var self = this;

    //ui related observables
    self.enabled = ko.observable(true);
    self.effectLimitPerBiomeType = ko.observable(1);
    self.maxAmount = ko.observable(16);
    self.sunChance = ko.observable(1.0);
    self.gasChance = ko.observable(1.0);
    self.metalChance = ko.observable(1.0);
    self.asteroidChance = ko.observable(1.0);
    self.moonChance = ko.observable(1.0);
    self.lavaChance = ko.observable(1.0);
    self.earthChance = ko.observable(1.0);
    self.tropicalChance = ko.observable(1.0);
    self.desertChance = ko.observable(1.0);
    self.iceChance = ko.observable(1.0);

    //text box focus observables
    self.box1Selected = ko.observable(false);
    self.box2Selected = ko.observable(false);
    self.box3Selected = ko.observable(false);
    self.box4Selected = ko.observable(false);
    self.box5Selected = ko.observable(false);
    self.box6Selected = ko.observable(false);
    self.box7Selected = ko.observable(false);
    self.box8Selected = ko.observable(false);
    self.box9Selected = ko.observable(false);
    self.box10Selected = ko.observable(false);
    self.box11Selected = ko.observable(false);
    self.box12Selected = ko.observable(false);
    self.selectedBoxes = ko.computed(function(){return [self.box1Selected(),self.box2Selected(),self.box3Selected(),self.box4Selected(),
                                            self.box5Selected(),self.box6Selected(),self.box7Selected(),self.box8Selected(),
                                            self.box9Selected(),self.box10Selected(),self.box11Selected(),self.box12Selected()]})
}

lobbyEffectSettingsModel = new effectSettingsModel();

testObservable = ko.observable(1.0);

if(model.systemEffectSettings == undefined){localStorage.systemEffectSettings = JSON.stringify(baseSystemEffectSettings); model.systemEffectSettings = baseSystemEffectSettings}


loadPastSettings();


//attaches the html to the frame

$("#game_options").append('<div data-bind = "visible: isGameCreator"><label data-bind="click: toggleSystemEffectSettingsFrame"><input type="checkbox" style="pointer-events: none !important;" data-bind="checked: toggleSystemSettingsChecked"><label>Show System Effect Settings</label></label></div>')

var toggleSystemSettingsChecked = ko.observable(false);
function toggleSystemEffectSettingsFrame(){
    if($("#lobbyEffectSettings").length == 0){
        toggleSystemSettingsChecked(true);
        forgetFramePosition("lobbyEffectSettings");
        lockFrame("lobbyEffectSettings");
        createFloatingFrame("lobbyEffectSettings", 450, 50, {"offset": "topLeft", "left": 20});
        $.get("coui://ui/mods/system_effects/lobbySettingsUI.html", function (html) {
		$("#lobbyEffectSettings").append(html);
})
    }
    else{
        $("#lobbyEffectSettings").remove();
        toggleSystemSettingsChecked(false);
    }
}

function enabledToggle(){
    
    console.log("toggling enabled to "+!lobbyEffectSettingsModel.enabled())
    lobbyEffectSettingsModel.enabled(!lobbyEffectSettingsModel.enabled());
    enabledToggleCount = 1;
  
}

//loads locally stored settings
function loadPastSettings(){
    var localSettings = model.systemEffectSettings;
    lobbyEffectSettingsModel.enabled(localSettings.enabled);
    lobbyEffectSettingsModel.effectLimitPerBiomeType(localSettings.effectLimitPerBiomeType);
    lobbyEffectSettingsModel.maxAmount(localSettings.maxAmount);
    lobbyEffectSettingsModel.sunChance(localSettings.sunChance);
    lobbyEffectSettingsModel.gasChance(localSettings.gasChance);
    lobbyEffectSettingsModel.metalChance(localSettings.metalChance);
    lobbyEffectSettingsModel.asteroidChance(localSettings.asteroidChance);
    lobbyEffectSettingsModel.moonChance(localSettings.moonChance);
    lobbyEffectSettingsModel.lavaChance(localSettings.lavaChance);
    lobbyEffectSettingsModel.earthChance(localSettings.earthChance);
    lobbyEffectSettingsModel.tropicalChance(localSettings.tropicalChance);
    lobbyEffectSettingsModel.desertChance(localSettings.desertChance);
    lobbyEffectSettingsModel.iceChance(localSettings.iceChance);
}

ko.computed(function(){

var settingsObject = {
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

settingsObject.enabled = lobbyEffectSettingsModel.enabled();
settingsObject.effectLimitPerBiomeType = lobbyEffectSettingsModel.effectLimitPerBiomeType();
settingsObject.maxAmount = lobbyEffectSettingsModel.maxAmount();
settingsObject.sunChance = lobbyEffectSettingsModel.sunChance();
settingsObject.gasChance = lobbyEffectSettingsModel.gasChance();
settingsObject.metalChance = lobbyEffectSettingsModel.metalChance();
settingsObject.asteroidChance = lobbyEffectSettingsModel.asteroidChance();
settingsObject.moonChance = lobbyEffectSettingsModel.moonChance();
settingsObject.lavaChance = lobbyEffectSettingsModel.lavaChance();
settingsObject.earthChance = lobbyEffectSettingsModel.earthChance();
settingsObject.tropicalChance = lobbyEffectSettingsModel.tropicalChance();
settingsObject.desertChance = lobbyEffectSettingsModel.desertChance();
settingsObject.iceChance = lobbyEffectSettingsModel.iceChance();

localStorage["systemEffectSettings"] = JSON.stringify(settingsObject);
})
