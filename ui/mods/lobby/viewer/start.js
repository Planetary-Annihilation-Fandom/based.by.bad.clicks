
$(function () {
    $.get("coui://ui/mods/lobby/viewer/button.html").then(function(file){
       $("#game-bar").prepend(file)
    })
});

model.switchToLobbyBrowser = function(){
   window.location.href = 'coui://ui/main/game/server_browser/server_browser.html';
   localStorage["modify_server_back_button"] = "true";
}