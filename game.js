// variables

var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red" , "blue" , "green" , "yellow"];

// start game  variables

var started = false;
var level = 0 ;


// Detect when a key pressed
$(document).keypress(function() {
if (!started) {

  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
}
});

// the sequence of game

function nextSequence(){

  userClickedPattern = [];

level++;

$("#level-title").text("Level " + level);

var randomNumber = Math.floor(Math.random()*4);

var randomChosenColour = buttonColours[randomNumber];

gamePattern.push(randomChosenColour);

 $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);


// click function
}
$(".btn").click(function() {

var userChosenColour =  $(this).attr("id");
userClickedPattern.push(userChosenColour);

playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});



// function works after klickes and game

// sound plays when key get klicked
function playSound(name){
var audio= new Audio ("sounds/"+name+".mp3");
audio.play();
}

// animate when key get pressed or the sequence

function animatePress(currentColor) {

$("#" + currentColor).addClass("pressed");

setTimeout(function () {
  $("#" + currentColor).removeClass("pressed");
}, 100);
}


function checkAnswer(currentLevel){

if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

  console.log("success");

  if (userClickedPattern.length === gamePattern.length){

    setTimeout(function () {
      nextSequence();
    }, 1000);

  }

} else {

console.log("wrong");
var gameOver = new Audio("sounds/wrong.mp3");
gameOver.play();
$("body").addClass("game-over");
setTimeout(function(){
 $("body").removeClass("game-over");
},200);
$("#level-title").text("Game Over, Press Any Key to Restart");
startOver();
}
}


function startOver(){
level = 0;
gamePattern = [];
started = false ;
}
