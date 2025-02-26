const tilesContainer = document.querySelector(".tiles");
const tileColors = [
  "aqua",
  "violet",
  "crimson",
  "blue",
  "dodgerblue",
  "gold",
  "greenyellow",
  "green",
];
const colorPicklist = [...tileColors, ...tileColors];
const tileCount = colorPicklist.length;

//Game state
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

//reset button
const restartButton = document
  .getElementById("restartbtn")
  .addEventListener("click", () => {
    location.reload();
  });
//sets each tile with its own color.
const buildTile = (color) => {
  const element = document.createElement("div");

  element.classList.add("tile");
  element.setAttribute("data-color", color);
  element.setAttribute("data-revealed", "false");

  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed");

    if (awaitingEndOfMove || revealed === "true" || element == activeTile) {
      return;
    }

    element.style.backgroundColor = color;
    element.classList.add("flipped");

    if (!activeTile) {
      activeTile = element;

      return;
    }
    const colorToMatch = activeTile.getAttribute("data-color");

    if (colorToMatch === color) {
      activeTile.setAttribute("data-revealed", "true");
      element.setAttribute("data-revealed", "true");

      awaitingEndOfMove = false;
      activeTile = null;
      revealedCount += 2;

      if (revealedCount === tileCount) {
        setTimeout(
          () => alert("🎉 You win! Click Restart to play again."),
          500
        );
      }
      return;
    }

    awaitingEndOfMove = true;

    setTimeout(() => {
      element.style.backgroundColor = null;
      element.classList.remove("flipped");
      activeTile.style.backgroundColor = null;
      activeTile.classList.remove("flipped");

      awaitingEndOfMove = false;
      activeTile = null;
    }, 1000);
  });
  return element;
};

// Builds up the tiles
for (let i = 0; i < tileCount; i++) {
  const randomIndex = Math.floor(Math.random() * colorPicklist.length);
  const color = colorPicklist[randomIndex];
  const tile = buildTile(color);

  colorPicklist.splice(randomIndex, 1);
  tilesContainer.appendChild(tile);
}
