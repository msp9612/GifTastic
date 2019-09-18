// Matt Petrower

// Theme: instruments
var topics = ["Guitar", "Drums", "Piano"];


createTopicButtons();


$(document).on("click", ".topic-button", function () {
    // User clicks on a topic button
    $("#output").empty();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        $(this).text() + "&api_key=x6F3pfxkqKMEhu2U8AOt2RK4zj0mgfdT&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            results.forEach(function (item) {
                var image = $("<img class='gif'>")
                image.attr("fixed-height-still", item.images.fixed_height_still.url);
                image.attr("fixed-height", item.images.fixed_height.url);
                image.prop("animated", false);
                image.attr("src", image.attr("fixed-height-still"));
                var rating = $("<p>").text("Rating: " + item.rating.toUpperCase());
                $("#output").append(image);
                $("#output").append(rating);
                $("#output").append("<br>");
            });
        });
});

$(document).on("click", ".gif", function () {
    // User clicks on a gif
    if (!$(this).prop("animated")) {
        // Image is still
        $(this).prop("animated", true);
        $(this).attr("src", $(this).attr("fixed-height"));
    }
    else {
        // Image is animated
        $(this).prop("animated", false);
        $(this).attr("src", $(this).attr("fixed-height-still"));
    }
});

$("#submit").on("click", function () {
    // User submits a new topic
    event.preventDefault();
    var input = $("#new-topic-text").val().trim();
    if (input !== "") {
        topics.push(input);
        createTopicButtons();
        $("#new-topic-text").val("");
    }
});

function createTopicButtons() {
    // Create/refresh all topic buttons
    $("#topic-buttons").empty();
    topics.forEach(function (item) {
        var topicButton = $("<button>").text(item);
        topicButton.addClass("topic-button");
        $("#topic-buttons").append($(topicButton));
    });
}