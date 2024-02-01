

model.metalInSelection = ko.observable(0);

$(".wrapper").prepend("<div class='metalInSelection'><p style= color:Lime;font-size:100%;><span data-bind='text: model.metalInSelection'></span></p></div>")

handlers.totalMetalInSelection = function(payload){
	model.metalInSelection(payload + " Metal")
}