model.selection.subscribe(function () {
    if(model.selectedMobile() == false){
        console.log("infinitybuild")
        model.selectionBuildStanceContinuous();
    }
});