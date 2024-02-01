var bugStartLoaded;
var legionStartLoaded;
if(localStorage.selectedTheme == undefined){localStorage.selectedTheme = -1}
model.selectedTheme = ko.observable(localStorage.selectedTheme)
model.randomThemeSet = ko.observable(false).extend({session:'randomTheme'})
if (!bugStartLoaded) {
  bugStartLoaded = true;

  function bugsStart() {
    try {
      var randomTheme = api.settings.isSet("ui", "bugsMenuThemeRandom", true) || "OFF";
      if(randomTheme == "ON" && model.randomThemeSet() == false){
        var chosenRandomTheme = _.sample(["bugs","legion","mla"])
        model.selectedTheme(chosenRandomTheme);
        model.randomThemeSet(true);
      }
      var bugThemeSetting = api.settings.isSet("ui", "bugsMenuThemeFunction", true) || "ON";

      var legionThemeSetting = api.settings.isSet("ui", "legionMenuThemeFunction", true) || "ON";
      

      model.switchTheme = function () {//switches themes between active mod menus
          if(legionStartLoaded !== undefined && legionThemeSetting == "ON"){
            if((model.selectedTheme() == "bugs" || model.selectedTheme() == -1) && bugThemeSetting == "ON"){//bugs overwrites legion so switch to legion
                model.selectedTheme("legion");
                $("body").addClass("legion");
                $("body").removeClass("bugs");
            }
            else if(model.selectedTheme() == "legion" || model.selectedTheme() == -1){//switch to mla
                model.selectedTheme("mla");
                $("body").removeClass("legion");
            }
            else if(model.selectedTheme() == "mla" && bugThemeSetting == "ON"){//switching to bugs from mla
              model.selectedTheme("bugs");
              $("body").addClass("bugs");
            }
            else{//switching from mla to legion  if bugs menu is off
              model.selectedTheme("legion");
              $("body").addClass("legion");
            }

          }
          else{
            if(model.selectedTheme() == -1 || model.selectedTheme() == "bugs"){
              model.selectedTheme("mla");
              $("body").removeClass("bugs");
            }
            else{
              model.selectedTheme("bugs");
              $("body").addClass("bugs");
            }

          }
      };

      $("#menu").after(
        loadHtml("coui://ui/mods/bugs_faction/theme_switcher.html")
      );
      //locTree($("#theme_switcher"));

      $("div.div_watermarks").css("bottom", "95px");


      if (bugThemeSetting === "ON") {
        loadCSS(
          "coui://ui/mods/bugs_faction/css/bug_buttons.css"
        );
        loadCSS("coui://ui/mods/bugs_faction/css/bug_shared.css");
        loadCSS("coui://ui/mods/bugs_faction/css/start.css");
        $("body").addClass("bugs");
      }

      if(model.selectedTheme() === "mla"){
        $("body").removeClass("bugs");
        $("body").removeClass("legion");
      };
      if(model.selectedTheme() === "legion"){
        $("body").removeClass("bugs");
      };

    } catch (e) {
      console.error(e);
      console.error(JSON.stringify(e));
    }
  }
  bugsStart();
}

ko.computed(function(){
  localStorage.selectedTheme = model.selectedTheme();
})




