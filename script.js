const gameContainer = document.getElementById("game");
let available = true;
let fCard = null;
let sCard = null;
let flippedCards = 0;
let count = 0;


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

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  if (available == false) {
    return;
  }
  let card = e.target;
  if (card.classList.contains("flipped")) {
    return;
  }
  card.style.backgroundColor = card.classList[0];
  count++;
  if (count == 1) {
    fCard = card;
    fCard.style.backgroundColor = card.style.backgroundColor;
    fCard.removeEventListener('click', handleCardClick);
    fCard.classList.add('flipped');
  } else {
    sCard = card;
    sCard.style.backgroundColor = card.style.backgroundColor;
    sCard.removeEventListener('click', handleCardClick);
    sCard.classList.add('flipped');
    if (fCard != null && sCard != null) {
      available = false;
    }

    if (fCard.className == sCard.className) {
      available = true;
      count = 0;
      fCard = null;
      sCard = null;
      flippedCards += 2;
    } else {
      setTimeout(function() {
        count = 0;
        fCard.classList.remove("flipped");
        sCard.classList.remove("flipped");
        fCard.style.backgroundColor = "";
        sCard.style.backgroundColor = "";
        fCard = null;
        sCard = null;
        available = true;
      }, 1000);
      fCard.addEventListener('click', handleCardClick);
      sCard.addEventListener('click', handleCardClick);
    }
  }

  // you can use event.target to see which element was clicked
  console.log("you just clicked", e.target);
}

// when the DOM loads
createDivsForColors(shuffledColors);