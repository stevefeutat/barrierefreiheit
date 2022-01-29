<?php
$name = $_POST["name"];
$groesse = $_POST["spielfeldgroesse"];
$bilder = $_POST["bildwahl"];
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Game Page</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />
    
    <link rel="stylesheet" href="stylesheet.css">
    <!-- collection[i].style.width = "200px"; -->
    <!-- collection[i].style.height = "200px"; -->
   
    <script type="text/javascript">

    function Bildgroesser () {


    const collection = document.getElementsByClassName("btn btn-primary m-2");
    for (let i = 0; i < collection.length; i++) {

    collection[i].style.transform = "scale(1.5,1.5)";
    }

    }

    function Bildkleiner () {


    const collection = document.getElementsByClassName("btn btn-primary m-2");
    for (let i = 0; i < collection.length; i++) {

    collection[i].style.transform = "scale(1,1)";
    }

  }
</script>
  </head>

  <body>
    <h1><p class="text-center">MEMORY GAME</p></h1>
    <div class="spielinformationen">
      <h2> Spielinformationen: </h2>
    <?php 
        echo "Hallo $name <br />";
        echo "Spielfeldgröße: $groesse Spielkarten <br />";
        if ($bilder == 1){
        echo "Motivwahl: Tiere <br />";
        } else {
        echo "Motivwahl: Blumen <br />";
        }

    ?>
    </div>

    <div class="container2">
        <h2>Spielfeld</h2>
      <div id="result"></div>
    </div>
    <h2>Spielfortschritt:</h2>

    <h2>Karten vergrößern:</h2>

    <button onclick="Bildgroesser ()">
        Größer
    </button>
    <button onclick="Bildkleiner ()">
        kleiner
    </button>

    <!-- <script src="main.js"></script> -->
    <script type="text/JavaScript">
    const resultDisplay = document.querySelector("#result");
    <?php
       echo "var card ='$groesse';";
   ?>
    if (card == 12){
    var cardBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    ];
    } 
    else if (card == 16){
    var cardBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    ];
    }
    else {
      var cardBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    ];
    }

  

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
          "<button class='btn btn-primary m-2' style='height: 100px; width: 100px; padding:1%;' onClick='flipCard(\"" +
          i +
          "-" +
          j +
          "\")'>Card </button>";
      } else {
        txt +=
          "<img src='" +
          getImage(cardBoard[i][j]) +
          "'style='height: 100px; width: 100px class='m-2'>";
      }
    }
    txt += "</div>";
  }
  resultDisplay.innerHTML = txt;
}
<?php
       echo "var bildwahl ='$bilder';";
   ?>
function getImage(value) {
  if (bildwahl == 1){
  var imageTxt = "http://www.vanderfriedrich.de/images/animals/";
  switch (value) {
    case 1:
      imageTxt += "image1.png";
      break;
    case 2:
      imageTxt += "image2.png";
      break;
    case 3:
      imageTxt += "image3.png";
      break;
    case 4:
      imageTxt += "image4.png";
      break;
    case 5:
      imageTxt += "image5.png";
      break;
    case 6:
      imageTxt += "image6.png";
      break;
    case 7:
      imageTxt += "image7.png";
      break;
    case 8:
      imageTxt += "image8.png";
      break;
    case 9:
      imageTxt += "image9.png";
      break;
    case 10:
      imageTxt += "image10.png";
      break;
    default:
      console.log("Cannot find image" + value);
  }
  return imageTxt;
}
else {
  var imageTxt = "http://www.vanderfriedrich.de/images/flower/";
  switch (value) {
    case 1:
      imageTxt += "blume01.png";
      break;
    case 2:
      imageTxt += "blume02.png";
      break;
    case 3:
      imageTxt += "blume03.png";
      break;
    case 4:
      imageTxt += "blume04.png";
      break;
    case 5:
      imageTxt += "blume05.png";
      break;
    case 6:
      imageTxt += "blume06.png";
      break;
    case 7:
      imageTxt += "blume07.png";
      break;
    case 8:
      imageTxt += "blume08.png";
      break;
    case 9:
      imageTxt += "blume09.png";
      break;
    case 10:
      imageTxt += "blume10.png";
      break;
    default:
      console.log("Cannot find image" + value);
  }
  return imageTxt;
}
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
</script>
    <!-- Optional JavaScript; choose one of the two! -->

    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
      crossorigin="anonymous"
    ></script>

    <!-- Option 2: Separate Popper and Bootstrap JS -->
    <!--
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
    -->

  </body>
</html>
