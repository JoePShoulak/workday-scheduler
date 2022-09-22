// Pick a dynamic color based on whether the timeslot is in the past, present, or future
function getColorFromTime(time) {
    var currentTime = moment().format("H"); // get the time from moment.js

    if (time < currentTime) { return "#ff0000"; } // if past, red
    else if (time > currentTime) { return "#00ff00"; } // if future, green
    
    return "#888888"; // default (present), gray
}

// Simple function to grab from localStorage
function getEventFromLocal(time) {
    return localStorage.getItem(time);
}

// Save an event to localStorage
function saveEventToLocal(time) {
    var eventText = $(`#text-area-${time}`).val(); // grab the textArea value
    localStorage.setItem(time, eventText); // and save it to localStorage
}

// Handle all click events
function handleClick(event) {
    // We only care if it's a button
     if (event.target.tagName == "BUTTON") {
        var time = event.target.id.split("-")[2]; // the index of the button's id
        saveEventToLocal(time); // begin to save the data
     }
}

// Create a new element containing all the required elements for a timeslot
function newTimeSlot(hour) {
    // Make our Label
    var label = $("<label>")
      .text(`${hour}:00`);

    // Make the text area
    var textArea = $("<textarea>")
      .attr("id", `text-area-${hour}`)
      .text(getEventFromLocal(hour)) // Populate from localStorage
      .css("background-color", getColorFromTime(hour)); // Color depends on past/present/future

    // Make the Save Button
    var button = $("<button>")
      .attr("id", `save-button-${hour}`)
      .text("Save");

    // Return out a div element containing all those items
    return $("<div>")
      .append(label)
      .append(textArea)
      .append(button);
}

// Render the HTML and CSS content for the Scheduler
function createScheduler() {
    // For every hour in the day...
    for (hour = 0; hour < 24; hour++) {  
        $('.container').append(newTimeSlot(hour)); // append a new timeSlot into the container
    }
}

// On first page load, create the scheduler
function init() {
    createScheduler();
}

// Add an eventListener to catch all clicks that may be on buttons
$('.container').on("click", handleClick);

// Run everything that has to be run on first page load
init();