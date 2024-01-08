const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
 var totalScore = 0;

var counter = 0;
var currentId = 0;
var twoSameColorIds = [];
var flippedIds = [];
var lastColor = "";
var lastId = "";

let shuffledColors = shuffle(COLORS);
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

const startBtn = document.getElementById("start");
startBtn.addEventListener("click", function(){
  

  createDivsForColors(shuffledColors);
  if (localStorage.getItem("lowestScore")){
    
    let lowestScore = localStorage.getItem("lowestScore");
    let scoreObj = document.getElementById("lowscore");
    scoreObj.innerHTML = lowestScore;
  }
});

const restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", function(){
  reset();
  let lowestScore = localStorage.getItem("lowestScore");
  let scoreObj = document.getElementById("lowscore");
  scoreObj.innerHTML = lowestScore;
});

function reset(){

  for (let id of flippedIds){
    const colorItem = document.getElementById(id);
    colorItem.style.backgroundColor = "";
  }
  flippedIds = [];
  counter = 0;
  ids = [];
  currentId = "";
  currentColor = "";
  lastId = "";
  lastColor = [];
}
// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");


    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    currentId += 1;
    newDiv.id = currentId;

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    /*counter, ids = newDiv.addEventListener("click", (event) => {
      handleCardClick(event, counter, ids);
    });*/

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  totalScore += 1;
  let scoreObj = document.getElementById("score");
  scoreObj.innerHTML = totalScore;
  let currentColor = event.target.className;
  currentId = event.target.id;
  if (counter === 2 || lastId === currentId || flippedIds.includes(currentId)){
    return;
  }
  event.target.style.backgroundColor = currentColor;
  console.log("you just clicked", currentColor);
  counter += 1;
  twoSameColorIds.push(event.target.id);
  
  if(counter === 2){
    if(lastColor !== currentColor ){ 
      setTimeout(function () {
        for(let id of twoSameColorIds) {
          if(!flippedIds.includes(id)){
            clicked = document.getElementById(id);
            clicked.style.backgroundColor = '';
          }
        }
        counter = 0;
        twoSameColorIds = [];
        lastId = "";
      }, 1000);
      

    } else {
      // last color equals current color
      flippedIds.push(lastId);
      flippedIds.push(currentId);
      counter = 0;
      twoSameColorIds = [];
      lastId = "";
    }
  } else if (counter === 1) {
    //sessionStorage.setItem("clickedColor", currentColor);
    lastColor = currentColor;
    lastId = event.target.id;
    //setTimeout(function(){event.target.style.backgroundColor = '';}, 1000);

  }
  if(flippedIds.length === shuffledColors.length) {
    localStorage.setItem("lowestScore", totalScore);
  }
}



// when the DOM loads
//createDivsForColors(shuffledColors);

