//most code in this file was taken from legions live game players file

var bugsLiveGamePlayersLoaded;
var legionCommanders = ["/pa/units/commanders/l_overwatch/l_overwatch.json", "/pa/units/commanders/l_rockteeth/l_rockteeth.json", "/pa/units/commanders/l_cyclops/l_cyclops.json", "/pa/units/commanders/l_wasushi/l_wasushi.json"]
var bugCommanders = ["/pa/units/commanders/bug_commander/bug_commander.json","/pa/units/commanders/scenario_ai_invincible_com/scenario_ai_invincible_com.json"]

if (!bugsLiveGamePlayersLoaded) {
  bugsLiveGamePlayersLoaded = true;
  function bugsLiveGamePlayers() {
    try {
      loadCSS("coui://ui/mods/bugs_faction/css/bug_players.css");
      var checkCommanders = function (commanders) {
        var legionCount = 0;
        var bugsCount = 0;
        var mlaCount = 0;
        var specsLength = 0;
        if (commanders !== undefined) {
          var factionArray = [];
          _.forOwn(commanders, function (value) {
            var mlaFound = true;
            // eslint-disable-next-line no-undef
            if (_.includes(legionCommanders, value)) {
              legionCount++
              mlaFound = false;
            }
            if (_.includes(bugCommanders, value)) {
              bugsCount++;
              mlaFound = false;
            }
            if(mlaFound == true){mlaCount++}
            specsLength++;
          });
          if(legionCount == specsLength){return "legion"}
          if(bugsCount == specsLength){return "bugs"}
          if(legionCount > 0 && mlaCount > 0 && bugsCount == 0){return "mixed"}
          if(legionCount > 0 && bugsCount > 0 && mlaCount == 0){return "legion_bug_mix"}
          if(legionCount > 0 && bugsCount > 0 && mlaCount > 0){return "legion_bug_mla_mix"}
          if(legionCount == 0 && bugsCount > 0 && mlaCount > 0){return "bug_mla_mix"}

        
        }
        return "vanilla";
      };

      var isLegionOrMixedOrVanilla = ko.computed(function () {
        var selectedSpecs = model.player().commanders;
        return checkCommanders(selectedSpecs);
      });

      model.isLegion = ko.computed(function () {
        return isLegionOrMixedOrVanilla() === "legion";
      });

      model.isMixed = ko.computed(function () {
        return isLegionOrMixedOrVanilla() === "mixed";
      });

      model.isBugs = ko.computed(function () {
        return isLegionOrMixedOrVanilla() === "bugs";
      });

      model.isBugs = ko.computed(function () {
        return isLegionOrMixedOrVanilla() === "legion_bug_mix";
      });

      model.isBugs = ko.computed(function () {
        return isLegionOrMixedOrVanilla() === "legion_bug_mla_mix";
      });

      model.isBugs = ko.computed(function () {
        return isLegionOrMixedOrVanilla() === "bug_mla_mix";
      });

      model.commanderImage = function (data) {
        var result = "";
        switch (checkCommanders(data.commanders)) {
            case "legion":
            result = "coui://ui/mods/com.pa.legion-expansion/img/icon_player_outline_l.png";
            break;
            case "bugs":
            result = "coui://ui/mods/bugs_faction/img/bug_icon_outline.png";
            break;
            case "legion_bug_mix":
            result = "coui://ui/mods/bugs_faction/img/bug_legion_icon_outline.png";
            break;
            case "legion_bug_mla_mix":
            result = "coui://ui/mods/bugs_faction/img/bug_legion_mla_icon_outline.png";
            break;
            case "bug_mla_mix":
            result = "coui://ui/mods/bugs_faction/img/bug_mla_icon_outline.png";
            break;
            case "mixed":
            result = "coui://ui/mods/com.pa.legion-expansion/img/icon_player_outline_m.png";
            break;
            case "vanilla":
            result = "coui://ui/main/game/live_game/img/players_list_panel/icon_player_outline.png";
            break;
          }
        
        return result;
      };

      model.commanderImageMaskBugs = function (data) {
        return checkCommanders(data.commanders) === "bugs";
      };

      model.commanderImageMaskBugsMla = function (data) {
        return checkCommanders(data.commanders) === "bug_mla_mix";
      };

      model.commanderImageMaskBugsLegion = function (data) {
        return checkCommanders(data.commanders) === "legion_bug_mix";
      };

      model.commanderImageMaskBugsLegionMla = function (data) {
        return checkCommanders(data.commanders) === "legion_bug_mla_mix";
      };

      model.commanderImageMaskLeg = function (data) {
        return checkCommanders(data.commanders) === "legion";
      };

      model.commanderImageMaskMix = function (data) {
        return checkCommanders(data.commanders) === "mixed";
      };

      $(
        'img[src="img/players_list_panel/icon_player_outline.png"]'
      ).replaceWith(
        '<img data-bind="attr:{src: model.commanderImage($data)}" />'
      );
      $(".player_masked").attr(
        "data-bind",
        "style: { backgroundColor: color }, css: { legcom: model.commanderImageMaskLeg($data), mixcom: model.commanderImageMaskMix($data), bugcom: model.commanderImageMaskBugs($data), bugmlacom: model.commanderImageMaskBugsMla($data), buglegioncom: model.commanderImageMaskBugsLegion($data), buglegionmlacom: model.commanderImageMaskBugsLegionMla($data)}"
      );
    } catch (e) {
      console.error(e);
      console.error(JSON.stringify(e));
    }
  }
  bugsLiveGamePlayers();
}
