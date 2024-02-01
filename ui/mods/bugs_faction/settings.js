var bugSettingsLoaded;

if (!bugSettingsLoaded) {
  bugSettingsLoaded = true;

  function bugSettings() {
    try {
      _.assign(api.settings.definitions.ui.settings, {
        bugsThemeFunction: {
          title: "Theme In Game",
          type: "select",
          default: "ON",
          options: ["ON", "OFF"],
        },
      });

      _.assign(api.settings.definitions.ui.settings, {
        bugsMenuThemeFunction: {
          title: "Theme Menu",
          type: "select",
          default: "ON",
          options: ["ON", "OFF"],
        },
      });

      _.assign(api.settings.definitions.ui.settings, {
        bugsMenuThemeRandom: {
          title: "Random Theme",
          type: "select",
          default: "OFF",
          options: ["ON", "OFF"],
        },
      });

      model.settingDefinitions(api.settings.definitions);

      $(".option-list.ui .form-group").append(
        $.ajax({
          type: "GET",
          url: "coui://ui/mods/bugs_faction/settings.html",
          async: false,
        }).responseText
      );
    } catch (e) {
      console.error(e);
      console.error(JSON.stringify(e));
    }
  }
  bugSettings();
}
