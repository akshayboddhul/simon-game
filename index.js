//Default Colors for the Simon Game
var buttonColors = ["red", "blue", "green", "yellow"];

//When Color are randomly choose then added into gamepattern
var gamePattern = [];
//When user clicked particular color button, stored in this array
var userClickedPattern = [];

//This variable is used to choose random color button
var randomChosenColor;
//User Clicked color button returned
var userChosenColor;

//Default value of game level
var level = 0;
//Default game start is false, when user pressed any key then game started
var started = false;

//This keypress function is used to check whether key is pressed or not. If anykey is pressed then game started
$(document).keypress(function(){
   if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
       started = true;
   }
});
//This function called to get next pattern of color or it resets userClickedPattern array to "empty" if user clicks wrong color button
function nextSequence(){
    userClickedPattern = [];
    
    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
}
//It returns clicked color button with ID and call checkAnswer function
$(".btn").click(function(){
    userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length - 1);
});

//Checking user answer according to game pattern
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){    
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){//If true it wait 1second to randomly select next pattern
                nextSequence();
            },1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
       
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}
//This function us used to play sound of particular color and wrong click
function playSound(name){
    var playAudio = new Audio("sounds/" + name + ".mp3");
    playAudio.play();
}
//It returns animated effect when user clicked on particular color button
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}
//Sets all default value in this function
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}