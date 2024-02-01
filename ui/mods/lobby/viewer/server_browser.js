
$(function () {

    if (localStorage["modify_server_back_button"] == "true") {
        localStorage["modify_server_back_button"] = "false";

        model.back = function () {
            model.lastSceneUrl('coui://ui/main/game/server_browser/server_browser.html');
            window.location.href = 'coui://ui/main/game/new_game/new_game.html';

            return; /* window.location.href will not stop execution. */
        }
    }

});

function back() {

    model.lastSceneUrl('coui://ui/main/game/server_browser/server_browser.html');
    window.location.href = 'coui://ui/main/game/new_game/new_game.html';

    return; /* window.location.href will not stop execution. */
}