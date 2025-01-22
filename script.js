"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

window.addEventListener("load", () => {
  initGlobalObject();
  prepGame();
  /* if (checkForGameOver() === 1) {
    console.log("Spelare 1 vann");
  } else if (checkForGameOver() === 2) {
    console.log("Spelare 2 vann");
  } else if (checkForGameOver() === 3) {
    console.log("Oavgjort");
  } else {
    console.log("Spelet fortsätter");
  } */
});

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
function initGlobalObject() {
  //Datastruktur för vilka platser som är lediga respektive har brickor
  //Genom at fylla i här med antingen X eler O kan ni testa era rättningsfunktioner
  oGameData.gameField = ["", "", "", "", "", "", "", "", ""];

  /* Testdata för att testa rättningslösning */
  // oGameData.gameField = ["", "X", "X", "O", "O", "O", "", "", ""];
  // oGameData.gameField = ["X", "", "", "X", "", "", "X", "", ""];
  // oGameData.gameField = ['X', '', '', '', 'X', '', '', '', 'X'];
  // oGameData.gameField = ["", "", "X", "", "X", "", "X", "", ""];
  // oGameData.gameField = ["X", "O", "X", "0", "X", "O", "O", "X", "O"];

  //Indikerar tecknet som skall användas för spelare ett.
  oGameData.playerOne = "X";

  //Indikerar tecknet som skall användas för spelare två.
  oGameData.playerTwo = "O";

  //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
  oGameData.currentPlayer = "";

  // Får färgen hos aktuell spelare
  oGameData.currentPlayerColor = "";

  //Nickname för spelare ett som tilldelas från ett formulärelement,
  oGameData.nickNamePlayerOne = "";

  //Nickname för spelare två som tilldelas från ett formulärelement.
  oGameData.nickNamePlayerTwo = "";

  //Färg för spelare ett som tilldelas från ett formulärelement.
  oGameData.colorPlayerOne = "";

  //Färg för spelare två som tilldelas från ett formulärelement.
  oGameData.colorPlayerTwo = "";

  //Antalet sekunder för timerfunktionen
  oGameData.seconds = 5;

  //Timerns ID
  oGameData.timerId = null;

  //Från start är timern inaktiverad
  oGameData.timerEnabled = false;

  //Referens till element för felmeddelanden
  oGameData.timeRef = document.querySelector("#errorMsg");
}

/**
 * Kontrollerar för tre i rad genom att anropa funktionen checkWinner() och checkForDraw().
 * Returnerar 0 om spelet skall fortsätta,
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */
function checkForGameOver() {
  if (checkWinner(oGameData.playerOne)) {
    return 1;
  } else if (checkWinner(oGameData.playerTwo)) {
    return 2;
  } else if (checkForDraw()) {
    return 3;
  } else {
    return 0;
  }
}

// Säg till om ni vill få pseudokod för denna funktion
// Viktigt att funktionen returnerar true eller false baserat på om den inskickade spelaren är winner eller ej
function checkWinner(playerIn) {
  const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombo.some((combo) =>
    combo.every((square) => oGameData.gameField[square] === playerIn)
  );

  /*  for (const row of winningCombo) {
    let partsOfStreak = 0;
    for (const element of row) {
      if (oGameData.gameField[element] === playerIn) {
        partsOfStreak++;
      } else {
        partsOfStreak = 0;
        break;
      }
    }
    if (partsOfStreak === 3) {
      return true;
    }
  }
  return false; */
}

//Kontrollera om alla platser i oGameData.GameField är fyllda. Om sant returnera true, annars false.
function checkForDraw() {
  return oGameData.gameField.every((square) => square);
}

// Nedanstående funktioner väntar vi med!

// Dom-referenser
const gameAreaRef = document.getElementById("gameArea");
const newGameBtnRef = document.getElementById("newGame");
const theFormRef = document.getElementById("theForm");
const errorMsgRef = document.getElementById("errorMsg");
const nick1Ref = document.getElementById("nick1");
const nick2Ref = document.getElementById("nick2");
const color1Ref = document.getElementById("color1");
const color2Ref = document.getElementById("color2");
const tableRef = document.querySelector("table");
const tdRefs = document.querySelectorAll("td");
const jumbotronH1Ref = document.querySelector(".jumbotron h1");

function prepGame() {
  gameAreaRef.classList.add("d-none");
  // anropar funktionen utan () för att den bara ska köras när klickeventet sker. för att mata in argument kan man skriva ("click", (argumenten) => initiateGame)
  newGameBtnRef.addEventListener("click", initiateGame);
}

function validateForm() {}

function initiateGame() {
  theFormRef.classList.add("d-none");
  gameAreaRef.classList.remove("d-none");
  errorMsgRef.textContent = "";
  // nedan hämtar vi de värden som finns i elementen
  oGameData.nickNamePlayerOne = nick1Ref.value;
  oGameData.nickNamePlayerTwo = nick2Ref.value;
  oGameData.colorPlayerOne = color1Ref.value;
  oGameData.colorPlayerTwo = color2Ref.value;

  // här går vi igenom varje nod (del av listan vi får från querySelectorAll) och sätter texten och bakgrundsfärg. En node list är en array-liknande datasamling
  tdRefs.forEach((td) => {
    td.textContent = "";
    td.style.backgroundColor = "#ffffff";
  });

  // här deklareras tomma variabler utan likamedtecken. Vi gör det med let eftersom de måste få värden tilldelade
  let playerChar;
  let playerName;

  // math random ger ett slumptal mellan från och med noll till, men exklusive 1
  if (Math.random() < 0.5) {
    // playerChar = oGameData.playerOne;
    playerName = oGameData.nickNamePlayerOne;
    oGameData.currentPlayer = oGameData.playerOne;
    oGameData.currentPlayerColor = oGameData.colorPlayerOne;
  } else {
    // playerChar = oGameData.playerTwo;
    playerName = oGameData.nickNamePlayerTwo;
    oGameData.currentPlayer = oGameData.playerTwo;
    oGameData.currentPlayerColor = oGameData.colorPlayerTwo;
  }

  // tillskriver med template string för att kunna stoppa in variabeln
  jumbotronH1Ref.textContent = `Aktuell spelare är ${playerName}`;

  tableRef.addEventListener("click", executeMove);
}

function executeMove(event) {
  const tdRef = event.target;

  if (tdRef.textContent === "") {
    const tdDataRef = tdRef.getAttribute("data-id");

    oGameData.gameField[tdDataRef] = oGameData.currentPlayer;

    // I stället för en if-sats använder vi variablerna för nuvarande spelares symbol och färg (raderna 47 och 50). Sistnämnda skapade vi för ändamålet.
    tdRef.style.backgroundColor = oGameData.currentPlayerColor;
    tdRef.textContent = oGameData.currentPlayer;

    /* if (oGameData.currentplayer === oGameData.playerOne) {
      tdRef.style.backgroundColor = oGameData.colorPlayerOne;
      tdRef.textContent = oGameData.playerOne;
    } else {
      tdRef.style.backgroundColor = oGameData.colorPlayerTwo;
      tdRef.textContent = oGameData.playerTwo;
    } */
    checkForGameOver();
    changePlayer();
  }
}

function changePlayer() {
  if (oGameData.currentPlayer === oGameData.playerOne) {
    oGameData.currentPlayer = oGameData.playerTwo;
    oGameData.currentPlayerColor = oGameData.colorPlayerTwo;
    jumbotronH1Ref.textContent = `Aktuell spelare är ${oGameData.nickNamePlayerTwo}`;
  } else {
    oGameData.currentPlayer = oGameData.playerOne;
    oGameData.currentPlayerColor = oGameData.colorPlayerOne;
    jumbotronH1Ref.textContent = `Aktuell spelare är ${oGameData.nickNamePlayerOne}`;
  }
}

function timer() {}

function gameOver(result) {}
