var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


//change the heading to level
$("body").keydown(function() {
  // $("h1").text("Level ");
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//create random number to select random  buttons
function nextSequence() {

  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4); //to select number range from 0 to 3
  var randomChosenColour = buttonColors[randomNumber]; //assign the random number to the buttons
  gamePattern.push(randomChosenColour); // to store the sequence
  var buttonId = "#" + randomChosenColour; // string concatenation to get the button id selector

  $(buttonId).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //to animate the selected button
  playSound(randomChosenColour);

}


//function to animate the user clicks
function animatePress(currentColor) {

  $(currentColor).addClass("pressed");
  setTimeout(function() {
    $(currentColor).removeClass("pressed")
  }, 100);

}


//functiion to play sound
function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3"); //assigns a mp3 file to each bottons
  audio.play();

}


//to check and compare the gamepattern and user clicked gamePattern
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
}

 else {

  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");

  setTimeout(function() {
    $("body").removeClass("game-over")
  }, 200);

  startOver();

}

}


// to store the user click
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  buttonId2 = "#" + userChosenColour;
  $(buttonId2).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  animatePress(buttonId2);
  checkAnswer(userClickedPattern.length - 1);
  // console.log(userClickedPattern);
});


//start the game from begining
function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}
