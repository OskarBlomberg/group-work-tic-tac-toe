# Code Review-uppgift: Tic Tac Toe

## Introduktion

Detta är en övning i flera delmoment där tanken är att allteftersom vi förskaffar oss nya kunskaper så kommer vi att kunna bygga på vårt spel, för att i slutändan förhoppningsvis få ett fungerande Tic-Tac-Toe (tre-i-rad).
Allt efersom kommer vi att bygga på spelet genom att använda oss av grundläggande kodning, arrayer, objekt, DOM-inläsning, DOM-modifikation, händelsehantering, verifikation, felhantering med mera.

## Instruktioner

### Programmet

Programmet består av två stycken filer, index.html och script.js. Ni kan för tillfället helt bortse från index.html, men senare kommer ni att behöva använda den för att hämta input från användaren.

Det är MYCKET VIKTIGT att ni inte ändrar på någonting mellan alls i index.html.

Själva programmet i script.js innehåller ett så kallat global objekt. Detta objekt heter oGameData, och innehåller allt från båda spelarnas symboler, namn, färgval osv, till spelplanen. Tack vare att allt detta är globalt så kommer ni att kunna komma åt denna data från alla era funktioner senare under utvecklingens gång. (För att komma åt spelplanen anropar ni tex oGameData.gameField, currentPlayer blir oGameData.currentPlayer osv.).

### Första etappen - tas med till Code Review 17/1

Denna första etapp skall vi sätta era kunskaper ordentligt på prov för att se vad ni har lärt er såhär långt! Ni behöver först koda upp funktionen checkForGameOver() som kommer returnera spelets nuvarande status. checkForGameOver() kommer sedan i sin tur att anropa två andra funktioner som ni också behöver skriva: checkForWinner() som kontrollerar om vi har en vinnare, samt checkForDraw() som kontrollerar om vi har ett oavgjort resultat.

För att testa era funktioner så kan ni enkelt mata in data i arrayen oGameData.gameField som ni finner på rad 31 i koden. Testdata finner ni på rad 34-38.

#### checkForGameOver()

Denna funktion använder sig utav selektion för att avgöra reultatet på matchen. Här behöver ni kombinera selektioner med anrop till funktionerna checkForWinner() och checkForDraw(), och baserat på resultaten från dessa anrop SKALL ni returnera antingen 0, 1, 2 eller 3.

#### checkForWinner(playerIn)

Här tar vi emot en inkommande spelare, antingen 'X' eller 'O'. Tanken är att ni skall söka igenom de kombinationer på spelplanen som skulle innebära en vinst, och kontrollera om alla dessa positioner i varje kombination innehåller playerIn.
Funktionen SKALL returnera antingen true eller false.

#### checkForDraw()

Här kontrollerar ni om alla platser på spelplanen är upptagna eller inte.
Funktionen SKALL returnera antingen true eller false.

### Andra etappen

Denna andra etapp skall vi bygga spelet såpass långt så att det faktiskt kommer gå att spela. Vi kommer att att använda oss av bootstrap klassen "d-none" för att bestämma vilka element i DOM:en som skall synas och vice versa. Därutöver kommer vi att läsa in objekt från DOM:en, placera händelselyssnare, skicka variabler, ta emot parametrar, skriva ut saker på skärmen med mera.

För att kicka igång programmet behöver ni i er "script.js" först ta bort testkoden från förra veckan som anroper "checkForGameOver()", och istället anropa funktionen "prepGame()".

#### prepGame()

Här skall ni lägga till klassen "d-none" på elementet i DOM-en med id:t "gameArea", samt lägga en lyssnare på "Starta spelet!"-knappen som lyssnar efter ett klick. När den klickas skall ni anropa funktionen "initiateGame()".

#### initiateGame()

Lägg till kod för följande:

- Göm formuläret genom att lägga till klassen "d-none".
- Visa spelplanen genom att ta bort klassen "d-none" på elementet med id:t "gameArea".
- Ta bort textInnehållet i elementet med id:t "errorMsg".
- Spara information om båda spelarna i objektet "oGameData" (dvs. användarnamn och färgval för respektive spelare).
- Töm spelplanen genom att läsa in alla td-element, loopa igenom dem, och ändra dess text till en tom sträng (inga mellanslag). Sätt dessutom alla td-elements bakgrundsfärg till "#ffffff".
- Deklarera de lokala variablerna "playerChar" och "playerName".
- Bestäm vilken spelare som skall börja genom att slumpa fram ett tal mellan 0 och 1.
- Om talet är mindre än 0.5 så tilldelar ni:
  - playeChar = oGameData.playerOne;
  - playerName = oGameData.nickNamePlayerOne;
  - oGameData.currentPlayer = oGameData.playerOne;
- Om talet är större än, eller lika med, 0.5 gör ni samma sak som ovan, fast med spelare 2.
- Ändra texten i h1-elementet som ligger i div-elementet med klassen "jumbotron" till "Aktuell spelare är XXX", där ni ersätter XXX med namnet på den aktuella spelaren.
- Lägg till en klicklyssnare på tabellen som innehåller spelplanen. Vid klick skall funktionen "executeMove()" anropas.

#### executeMove()

- OM klickhändelsen INTE skett på en tabellcell (td) skall ni inte göra någonting. Annars forstätt följa kokboken.
  <details>
    <summary>Tips!</summary>
    event.target.tagName ger er namnet på elementet som klickades.
  </details>
- Kontrollera att den klickade cellen är ledig. Om den är ledig, gör följande (annars gör ni inget):
  - Hämta ut attributet "data-id" från den klickade cellen, och använd detta för att sätta "oGameData.gameField" på den hämtade positionen till nuvarande spelare "oGameData.currentPlayer" (som kommer vara "X", eller "O").
  - Kontrollera vem som är den nuvarande spelaren, och sätt
  - Kontrollera vem som är nuvarande spelare, och utifrån det sätt bakgrundsfärgen på den klickade tabellcellen till aktuell spelares färg. Sätt även cellens textinnehåll till spelarens symbol ("X" eller "O")
  - Ändra därefter oGameData.currentPlayer till den andra spelaren, och uppdatera texten i jumbotronen till den nya spelarens namn
- Anropa er rättningsfunktion för att kontrollera om spelet är slut (den kommer returnera antingen 1, 2, 3 för slut, eller 0 om spelet inte är slut). Om spelet är slut gör följande (annars gör ni inget):
  - Anropa gameOver och skicka med resultatet (1, 2 eller 3).

#### gameOver(result)

Denna funktion tar emot resultatet för spelet (1 om spelare 1 vunnit, 2 och spelare 2 vunnit, eller 3 om spelet slutat oavgjort)

- Ta bort klicklyssnaren på tabellen
  <details>
    <summary>Tips!</summary>
    Googla metoden removeEventListener()!
  </details>
- Ta bort klassen "d-none" på formuläret
- Lägg till klassen "d-none" på spelplanen
- Kontrollera vilken spelare som vunnit
- Skriv ut ett vinnarmeddelande i jumbotronen, följa av "Spela igen?".
- Anropa funktionen "initGlobalObject()" som nollställer vårt globala objekt till ursprungsinställningarna.
