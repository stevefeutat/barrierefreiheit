const contentDisplay = document.querySelector("#content");
const topicDisplay = document.getElementById("topic");
const topicFolder = localStorage.getItem("topicValue");
topicDisplay.innerHTML = topicFolder;
const scoreDisplay = document.getElementById("score");
scoreDisplay.textContent = "Congratulation you found all the matches";
var cardBoard = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

var randomBoard = generateCardBoard();
var oldSelection = [];
var numberOfDisplayedImages = 0;
var ready = true;
createCardBoard();
function createCardBoard() {
  var txt = "";
  for (var i = 0; i < cardBoard.length; i++) {
    txt += "<div>";
    for (var j = 0; j < cardBoard[i].length; j++) {
      if (cardBoard[i][j] === 0) {
        txt +=
          "<button class='btn btn-primary m-1' style='height: 100px; width: 100px' onClick='flipCard(\"" +
          i +
          "-" +
          j +
          "\")'>Card</button>";
      } else {
        txt +=
          "<img src='" +
          getImage(cardBoard[i][j]) +
          "style='height: 100px; width: 100px class='m-2'>";
      }
    }
    txt += "</div>";
  }
  contentDisplay.innerHTML = txt;
}
function getImage(value) {
  var imageTxt = `images/${topicFolder}/`;
  switch (value) {
    case 1:
      imageTxt += "image1.png' alt='bear'";
      break;
    case 2:
      imageTxt += "image2.png' alt='narwhal'";
      break;
    case 3:
      imageTxt += "image3.png' alt='cow'";
      break;
    case 4:
      imageTxt += "image4.png' alt='crocodile'";
      break;
    case 5:
      imageTxt += "image5.png' alt='parot'";
      break;
    case 6:
      imageTxt += "image6.png' alt='duck'";
      break;
    case 7:
      imageTxt += "image7.png' alt='elephant'";
      break;
    case 8:
      imageTxt += "image8.png' alt='giraffe'";
      break;
    case 9:
      imageTxt += "image9.png' alt='gorilla'";
      break;
    case 10:
      imageTxt += "image10.png' alt='hippo'";
      break;
    default:
      console.log("Cannot find image" + value);
  }
  return imageTxt;
}

//display card at the position
function flipCard(cardCoordinate) {
  if (ready) {
    numberOfDisplayedImages++;
    var line = cardCoordinate.substr(0, 1);
    var column = cardCoordinate.substr(2, 1);
    cardBoard[line][column] = randomBoard[line][column];
    createCardBoard();
    if (numberOfDisplayedImages > 1) {
      ready = false;
      setTimeout(() => {
        if (
          cardBoard[line][column] !==
          randomBoard[oldSelection[0]][oldSelection[1]]
        ) {
          cardBoard[line][column] = 0;
          cardBoard[oldSelection[0]][oldSelection[1]] = 0;
        }
        createCardBoard();
        ready = true;
        numberOfDisplayedImages = 0;
        oldSelection = [line, column];
      }, 1000);
    } else {
      oldSelection = [line, column];
    }
  }
}

function generateCardBoard() {
  var table = [];
  var options = [0, 0, 0, 0, 0, 0, 0, 0];
  for (var i = 0; i < 4; i++) {
    var ligne = [];
    for (var j = 0; j < 4; j++) {
      var fin = false;
      while (!fin) {
        var randomImage = Math.floor(Math.random() * 8);
        if (options[randomImage] < 2) {
          ligne.push(randomImage + 1);
          options[randomImage]++;
          fin = true;
        }
      }
    }
    table.push(ligne);
  }
  return table;
}
