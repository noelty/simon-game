
var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keydown(function() {
    if (!started) {
        nextSequence();
        $("#level-title").text("Level "+ level)
        started = true;
    }
}); 

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1)
});
function checkAnswer (currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success")
    }
    else{
        var wrongClick = new Audio("sounds/wrong.mp3")
        wrongClick.play()
        $("body").addClass("game-over")
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart.")
        startOver();
   
    }
    if (gamePattern.length === userClickedPattern.length) {
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
}

function startOver () {
            level = 0;
            gamePattern = [];
            started = false;
}


function nextSequence () {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+ level)
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeTo(100,0.00,"linear").fadeTo(100,1.00,"linear");
    playSound(randomChosenColor);

}

function playSound(name) {
    var btnAudio = new Audio("sounds/" + name + ".mp3")
    btnAudio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");},100);
}


 









