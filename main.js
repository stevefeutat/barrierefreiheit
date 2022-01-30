const contentDisplay = document.querySelector("#content");
const progressDisplay = document.querySelector("#myProgress");
const topicDisplay = document.getElementById("topic");
const topicFolder = localStorage.getItem("topicValue");
topicDisplay.innerHTML = topicFolder;
const dimDisplay = document.getElementById("dim");
const boardDim = localStorage.getItem("dimm");
dimDisplay.innerHTML = boardDim;
const scoreDisplay = document.getElementById("score");
scoreDisplay.textContent = 0;

var options = [];

var cardBoard = getBoardWithDim(boardDim);

var randomBoard = generateCardBoard();
var oldSelection = [];
var winningCards = [];
var numberOfDisplayedImages = 0;
var ready = true;
createCardBoard();
createProgressBar(0);

function getBoardWithDim(value) {
  let board;
  switch (value) {
    case "12":
      board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      options = [0, 0, 0, 0, 0, 0];
      break;
    case "16":
      board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      options = [0, 0, 0, 0, 0, 0, 0, 0];
      break;
    case "20":
      board = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ];
      options = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      break;
    default:
      console.log("Cannot find board with dimmension " + value);
  }
  return board;
}

function createCardBoard() {
  var txt = "";
  for (var i = 0; i < cardBoard.length; i++) {
    txt += "<div>";
    for (var j = 0; j < cardBoard[i].length; j++) {
      if (cardBoard[i][j] === 0) {
        txt +=
          "<button class='btn btn-primary m-1' style='height: 110px; width: 110px' onClick='flipCard(\"" +
          i +
          "-" +
          j +
          "\")'>Card</button>";
      } else {
        txt +=
          "<img src='" +
          getImage(cardBoard[i][j]) +
          "style='height: 110px; width: 110px class='m-1'>";
      }
    }
    txt += "</div>";
  }
  contentDisplay.innerHTML = txt;
}

function createProgressBar(value) {
  var score = (value / cardBoard.length) * cardBoard.length;
  var txt2 =
    "<div style='text-align: center'><progress value=" +
    score +
    " max='100'>" +
    score +
    " %</progress></div>";
  var txt = "<div class='progress'style='height:50px;'>";
  txt +=
    "<div class='progress-bar progress-bar' role='progressbar'aria-valuenow=" +
    score +
    " aria-valuemin='0' aria-valuemax='100' style='width:" +
    score +
    "%'><span class='sr-only' style='font-size:20px;'>" +
    score +
    "% Complete</span>";
  txt += "</div></div>";
  progressDisplay.innerHTML = txt;
}

function getImage(value) {
  var imageTxt = `images/${topicFolder}/`;
  let altTxt;
  switch (value) {
    case 1:
      altTxt =
        topicFolder === "animals"
          ? "bear "
          : topicFolder === "flowers"
          ? "flower1 "
          : "";
      imageTxt += "image1.png' alt=" + altTxt + " title=" + altTxt;
      break;
    case 2:
      altTxt =
        topicFolder === "animals"
          ? "narwhal "
          : topicFolder === "flowers"
          ? "flower2 "
          : "fruit2 ";
      imageTxt += "image2.png' alt=" + altTxt + " title=" + altTxt;
      break;
    case 3:
      altTxt =
        topicFolder === "animals"
          ? "cow "
          : topicFolder === "flowers"
          ? "flower3 "
          : "fruit3 ";
      imageTxt += "image3.png' alt=" + altTxt + " title=" + altTxt;
    case 4:
      altTxt =
        topicFolder === "animals"
          ? "crocodile "
          : topicFolder === "flowers"
          ? "flower4 "
          : "fruit4 ";
      imageTxt += "image4.png' alt=" + altTxt + " title=" + altTxt;
      break;
    case 5:
      altTxt =
        topicFolder === "animals"
          ? "parot "
          : topicFolder === "flowers"
          ? "flower5 "
          : "fruit5 ";
      imageTxt += "image5.png' alt=" + altTxt + " title=" + altTxt;
      break;
    case 6:
      altTxt =
        topicFolder === "animals"
          ? "duck "
          : topicFolder === "flowers"
          ? "flower6 "
          : "fruit6 ";
      imageTxt += "image6.png' alt=" + altTxt + " title=" + altTxt;
    case 7:
      altTxt =
        topicFolder === "animals"
          ? "elephant "
          : topicFolder === "flowers"
          ? "flower7 "
          : "fruit7 ";
      imageTxt += "image7.png' alt=" + altTxt + " title=" + altTxt;
      break;
    case 8:
      altTxt =
        topicFolder === "animals"
          ? "giraffe "
          : topicFolder === "flowers"
          ? "flower8 "
          : "fruit8 ";
      imageTxt += "image8.png' alt=" + altTxt + " title=" + altTxt;
      break;
    case 9:
      altTxt =
        topicFolder === "animals"
          ? "gorilla "
          : topicFolder === "flowers"
          ? "flower9 "
          : "fruit9 ";
      imageTxt += "image9.png' alt=" + altTxt + " title=" + altTxt;
      break;
    case 10:
      altTxt =
        topicFolder === "animals"
          ? "hippo "
          : topicFolder === "flowers"
          ? "flower10 "
          : "fruit10 ";
      imageTxt += "image10.png' alt=" + altTxt + " title=" + altTxt;
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
        } else {
          winningCards.push(cardBoard[line][column]);
          winningCards.push(cardBoard[oldSelection[0]][oldSelection[1]]);
          scoreDisplay.textContent = winningCards.length;
          var progressWidth =
            (winningCards.length * 100) /
            (cardBoard.length * cardBoard[0].length);
          createProgressBar(progressWidth);
          if (progressWidth === 100) {
            alert("Congratulation you found all the matches");
          }
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
  for (var i = 0; i < cardBoard.length; i++) {
    var ligne = [];
    for (var j = 0; j < cardBoard[0].length; j++) {
      var fin = false;
      while (!fin) {
        var randomImage = Math.floor(Math.random() * options.length);
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
