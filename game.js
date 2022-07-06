var buttonColors = ['red', 'blue', 'green', 'yellow'];

var gamePattern= [];
var userChosenPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
  if(!started){
    started = true;
    setTimeout(function(){
    nextSequence();
    }, 1000);
  }
})

$(".btn").click(function(){
  var userChosenColor = $(this).attr('id');
  userChosenPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userChosenPattern.length-1);
});

function checkAnswer(currentLevel){
  if(userChosenPattern[currentLevel] === gamePattern[currentLevel]){
    if(gamePattern.length === userChosenPattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();

  }
}

function nextSequence(){
  userChosenPattern = [];
  level++;
  $('h1').text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);  
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}