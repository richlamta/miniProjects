let buttonColours = ["red", "blue", "green", "yellow"]

let gamePattern = [];

let userClickedPattern = [];

let gameStarted = false;

let currentLevel = 0;

$(document).keydown(function() {
    if (!gameStarted) {
        $("#level-title").text("Level " + currentLevel);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});



function nextSequence() {
    userClickedPattern = [];
    currentLevel++;
    $("#level-title").text("Level " + currentLevel);

    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}


function playSound(name) {
    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout (function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(level) {
    if (gamePattern[level] === userClickedPattern[level]) {
        console.log("Success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }}
        else {
            console.log("Incorrect");

            playSound("wrong");

            $("body").addClass("game-over");

            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);

            $("#level-title").text("Game over, Press any key to restart");

            startOver();
        }

}

function startOver() {
    currentLevel = 0;
    gamePattern = [];
    gameStarted = false;
}