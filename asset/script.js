// Initial Array Sample
var topics = ['mr pickle', 'family guy', 'courage the dog', 'pinky and the brain', 'rick and morty', 'adventure times', 'simpsons', 'dexters laboratory', 'tom and jerry', 'batman']

//Rendering GIPHY API DATA
function displayCartoon() {
    //Clear Previous Images
    $("#cartoonImages").empty();
    var cartoonName = $(this).attr("dataName");
    //GIPHY API
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=2b2e800a52b5424ca5bd59a9713fa4a6&q=" + cartoonName + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {

        for (i = 0; i < response.data.length; i++) {
            //Cartoon Rating
            var rating = response.data[i].rating;

            // Creating an element for rating display
            var p = $("<p>").text("Rating: " + rating);
            
            var cartoonDiv = $("<div>");
            // Append rating to <div> at last index
            cartoonDiv.append(p);
           
            //Images and Gifs
            var cartoonImage = $("<img class=gif>");
            //Set "still" State
            cartoonImage.attr("data-state", "still");
            //Images, Setting the still URL 
            cartoonImage.attr("src", response.data[i].images.fixed_height_still.url);
            //Images, Setting data-still attribute and setting the url 
            cartoonImage.attr("data-still", response.data[i].images.fixed_height_still.url);
            //GIF, Setting data-animate attribute and setting the url 
            cartoonImage.attr("data-animate", response.data[i].images.fixed_height.url);
            // Append image and gif to <div> at last index
            cartoonDiv.append(cartoonImage);
            // Prepend cartoonDiv with p,image and gif at first index
            $("#cartoonImages").prepend(cartoonDiv);

        }
        //Click To Swicth Between Image And Gif
        $('.gif').on("click", function () {
          
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var currentState = $(this).attr("data-state")
            //Checking State, Changing State When Clicked
            var newState = (currentState === 'still') ? 'animate' : 'still'
            //Switching Between Image and Gif State
            var imageUrl = $(this).attr("data-" + newState)
            $(this).attr("src", imageUrl)
            $(this).attr("data-state", newState)
        });
    })
};

// Function Display cartoonButton
function renderButtons() {
    $("#cartoonButton").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {
        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of cartoon to our button
        a.addClass("button");
        // Adding a data-attribute
        a.attr("dataName", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#cartoonButton").append(a);
    }
}

//Searching Placeholder
$("#add-cartoon").on("click", function () {
    event.preventDefault();
    // This line grabs the input from the textbox
    var cartoon = $("#cartoon-input").val().trim();
    // Adding cartoon from the textbox to our array
    topics.push(cartoon);
    renderButtons();
    //Empty placeholder
    $("#cartoon-input").val('')
});

//Mouse Click Event On Button
$(document).on("click", ".button", displayCartoon);

renderButtons();