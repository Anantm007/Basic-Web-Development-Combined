// Array for button colours
var buttonColours = ["red", "blue", "green", "yellow"];

// Array to store the random generated pattern
var gamePattern = [];

// Array to store user clicks
var userClickedPattern = [];

// Keep track of whether the game has started or not
var started = false;

// Keep track of the Level
var level = 0;

// Use jQuery to detect any key pressed for game starting
$(document).keypress(function() {
  // If game has not started yet
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

  // Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});


// Function to generate a random sequence
function nextSequence() {

  // Once this function is called, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  // Increase level by 1 everytime this function is called
  level++;

  // Update h1 with this change
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  // Generate fading animation
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Generate sound
  playSound(randomChosenColour);
}

// Generate sound for user clicks
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function for animation
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


// Checking user's answer with our sequence
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    // If the user got the most recent answer right, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      // Call nextSequence()  to update level`
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  }
  // Answer is wrong
  else {
    playSound("wrong");

    // Create flash type animation for wrong answer
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }

}


// Restore to default values
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
