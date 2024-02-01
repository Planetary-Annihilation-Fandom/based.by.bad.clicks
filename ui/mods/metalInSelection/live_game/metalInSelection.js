


var selectionMetalChecker = ko.computed(function(){
    
    var selection = model.selection();
	  var totalMetal = 0;
    if(selection === undefined){return}
    if(selection === null){return}
    var selectionSpecs= selection.spec_ids;
    var unitSpecs = _.keys(selectionSpecs);
    for(var i = 0;i<unitSpecs.length;i++){
  
      var unitType = unitSpecs[i]
      var unitAmount = selectionSpecs[unitType].length;

      var unitMetal = model.unitSpecs[unitType].cost;
      var metalAmount = unitMetal * unitAmount;

      totalMetal += metalAmount;
  
    }
    api.Panel.message(api.panels.selection.id, 'totalMetalInSelection',totalMetal)
  })
