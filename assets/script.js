function getColorFromTime(time) {
    var currentTime = moment().format("H");

    if (time < currentTime) { return "#ff0000"; }
    else if (time > currentTime) { return "#00ff00"; }
    
    return "#888888";
}

function getEventFromLocal(time) {
    return localStorage.getItem(time);
}

function saveEventToLocal(time) {
    var eventText = $(`#text-area-${time}`).val();
    localStorage.setItem(time, eventText);
}

function handleClick(event) {
     if (event.target.tagName == "BUTTON") {
        var time = event.target.id.split("-")[2];
        saveEventToLocal(time);
     }
}

function createScheduler() {
    for (hour = 0; hour < 24; hour++) {  
        var label = $("<label>")
          .text(`${hour}:00`);

        var textArea = $("<textarea>")
          .attr("id", `text-area-${hour}`)
          .text(getEventFromLocal(hour))
          .css("background-color", getColorFromTime(hour));

        var button = $("<button>")
          .attr("id", `save-button-${hour}`)
          .text("Save");
    
        var newDiv = $("<div>")
          .append(label)
          .append(textArea)
          .append(button);
    
        $('.container').append(newDiv);
    }
}

function init() {
    createScheduler();
}

$('.container').on("click", handleClick);

init();