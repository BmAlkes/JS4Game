/* :root {
  --tile-size: 48px;
  --helmet-offset: 12px;
  --game-size: calc(var(--tile-size) * 20);
} */

const FILE_SIZE = 48;
const HELMET_OFFSET = 12;
const GAME_SIZE = FILE_SIZE * 20;

const root = document.documentElement;
root.style.setProperty("--tile-size", `${FILE_SIZE}px`);
root.style.setProperty("--helmet-offset", `${HELMET_OFFSET}px`);
root.style.setProperty("--game-size", `${GAME_SIZE}px`);

function createBoard() {
  const gameBoard = document.getElementById("board");
  const elements = [];

  function createElements(options) {
    let { item, top, left } = options;
    const currentElement = { item, currentPosition: { top, left } };
    elements.push(currentElement);
    const htmlElement = document.createElement("div");
    htmlElement.className = item;
    htmlElement.style.top = `${top}px`;
    htmlElement.style.left = `${left}px`;
    gameBoard.appendChild(htmlElement);

    function getNewDirection(buttonPress, position) {
      switch (buttonPress) {
        case "ArrowUp":
          return { top: position.top - FILE_SIZE, left: position.left };
        case "ArrowRight":
          return { top: position.top, left: position.left + FILE_SIZE };
        case "ArrowDown":
          return { top: position.top + FILE_SIZE, left: position.left };
        case "ArrowLeft":
          return { top: position.top, left: position.left - FILE_SIZE };

        default:
          return position;
      }
    }

    function validateMoviment(position, conflictItem) {
      return (
        position.left >= 48 &&
        position.left <= 864 &&
        position.top >= 96 &&
        position.top <= 816 &&
        conflictItem?.item !== "forniture"
      );
    }

    function getMovimentConflict(position, ele) {
      const conflictItem = ele.find((currentElement) => {
        return (
          currentElement.currentPosition.top === position.top &&
          currentElement.currentPosition.left == position.left
        );
      });
      return conflictItem;
    }

    function validadeConflict(currentEle, conflictItem) {
      function finishGame(message) {
        setTimeout(() => {
          alert(message);
          location.reload();
        }, 100);
      }
      if (currentEle.item === "hero") {
        if (
          conflictItem?.item === "mini-demon" ||
          conflictItem?.item === "trap"
        ) {
          finishGame("Gamer Over");
        }
        if (conflictItem?.item === "chest") {
          finishGame("You Win");
        }
      }
      if (currentEle.item === "mini-demon" && conflictItem?.item === "hero") {
        finishGame("You die");
      }
    }

    function move(buttonPress) {
      const newPosition = getNewDirection(
        buttonPress,
        currentElement.currentPosition
      );
      const conflictItem = getMovimentConflict(newPosition, elements);
      const isValidMoviment = validateMoviment(newPosition, conflictItem);

      if (isValidMoviment) {
        currentElement.currentPosition = newPosition;
        htmlElement.style.top = `${newPosition.top}px`;
        htmlElement.style.left = `${newPosition.left}px`;

        validadeConflict(currentElement, conflictItem);
      }
    }
    return {
      move: move,
    };
  }
  function createItem(options) {
    createElements(options);
  }

  function createHero(options) {
    const hero = createElements({
      item: "hero",
      top: options.top,
      left: options.left,
    });
    document.addEventListener("keydown", (e) => {
      hero.move(e.key);
    });
  }
  function createEnemy(options) {
    const enemy = createElements({
      item: "mini-demon",
      top: options.top,
      left: options.left,
    });
    setInterval(() => {
      const direction = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      const randomIndex = Math.floor(Math.random() * direction.length);
      const randomDirection = direction[randomIndex];
      enemy.move(randomDirection);
    }, 1000);
  }

  return {
    createItem: createItem,
    createHero: createHero,
    createEnemy: createEnemy,
  };
}

const board = createBoard();
// itens que vai ser redenrizado  ->minidemons/chest/hero/trap
// position x- number
// position y - number
board.createItem({
  item: "trap",
  top: FILE_SIZE * 15,
  left: FILE_SIZE * 1,
});
board.createItem({
  item: "trap",
  top: FILE_SIZE * 13,
  left: FILE_SIZE * 2,
});
board.createItem({
  item: "trap",
  top: FILE_SIZE * 11,
  left: FILE_SIZE * 18,
});
board.createItem({
  item: "trap",
  top: FILE_SIZE * 10,
  left: FILE_SIZE * 11,
});
board.createItem({
  item: "trap",
  top: FILE_SIZE * 10,
  left: FILE_SIZE * 9,
});
board.createItem({ item: "trap", top: FILE_SIZE * 10, left: FILE_SIZE * 8 });

board.createItem({
  item: "trap",
  top: FILE_SIZE * 10,
  left: FILE_SIZE * 6,
});
board.createItem({
  item: "trap",
  top: FILE_SIZE * 10,
  left: FILE_SIZE * 5,
});
board.createItem({
  item: "trap",
  top: FILE_SIZE * 10,
  left: FILE_SIZE * 4,
});
board.createItem({
  item: "trap",
  top: FILE_SIZE * 10,
  left: FILE_SIZE * 1,
});
board.createItem({
  item: "trap",
  top: FILE_SIZE * 15,
  left: FILE_SIZE * 1,
});
board.createItem({
  item: "trap",
  top: FILE_SIZE * 6,
  left: FILE_SIZE * 18,
});
board.createItem({
  item: "trap",
  top: FILE_SIZE * 15,
  left: FILE_SIZE * 1,
});
board.createItem({
  item: "trap",
  top: FILE_SIZE * 15,
  left: FILE_SIZE * 1,
});
board.createItem({
  item: "chest",
  top: FILE_SIZE * 2,
  left: FILE_SIZE * 17,
});
board.createEnemy({
  top: FILE_SIZE * 10,
  left: FILE_SIZE * 10,
});
board.createEnemy({
  top: FILE_SIZE * 6,
  left: FILE_SIZE * 1,
});
board.createEnemy({
  top: FILE_SIZE * 6,
  left: FILE_SIZE * 1,
});
board.createEnemy({
  top: FILE_SIZE * 6,
  left: FILE_SIZE * 1,
});
board.createEnemy({
  top: FILE_SIZE * 6,
  left: FILE_SIZE * 1,
});
board.createEnemy({
  top: FILE_SIZE * 6,
  left: FILE_SIZE * 1,
});
board.createEnemy({
  top: FILE_SIZE * 6,
  left: FILE_SIZE * 1,
});
board.createEnemy({
  top: FILE_SIZE * 6,
  left: FILE_SIZE * 1,
});
board.createEnemy({
  top: FILE_SIZE * 6,
  left: FILE_SIZE * 1,
});
board.createEnemy({
  top: FILE_SIZE * 6,
  left: FILE_SIZE * 1,
});
board.createEnemy({
  top: FILE_SIZE * 11,
  left: FILE_SIZE * 10,
});
board.createEnemy({
  top: FILE_SIZE * 8,
  left: FILE_SIZE * 7,
});
board.createEnemy({
  top: FILE_SIZE * 6,
  left: FILE_SIZE * 1,
});
board.createEnemy({
  top: FILE_SIZE * 18,
  left: FILE_SIZE * 16,
});
board.createEnemy({
  top: FILE_SIZE * 17,
  left: FILE_SIZE * 12,
});
board.createEnemy({
  top: FILE_SIZE * 17,
  left: FILE_SIZE * 12,
});
board.createEnemy({
  top: FILE_SIZE * 17,
  left: FILE_SIZE * 12,
});
board.createEnemy({
  top: FILE_SIZE * 17,
  left: FILE_SIZE * 12,
});
board.createEnemy({
  top: FILE_SIZE * 17,
  left: FILE_SIZE * 12,
});
board.createEnemy({
  top: FILE_SIZE * 17,
  left: FILE_SIZE * 12,
});
board.createEnemy({
  top: FILE_SIZE * 17,
  left: FILE_SIZE * 12,
});

board.createEnemy({
  top: FILE_SIZE * 17,
  left: FILE_SIZE * 12,
});
board.createEnemy({
  top: FILE_SIZE * 17,
  left: FILE_SIZE * 12,
});
board.createEnemy({
  top: FILE_SIZE * 17,
  left: FILE_SIZE * 12,
});
board.createEnemy({
  top: FILE_SIZE * 17,
  left: FILE_SIZE * 12,
});
board.createEnemy({
  top: FILE_SIZE * 17,
  left: FILE_SIZE * 12,
});
board.createEnemy({
  top: FILE_SIZE * 17,
  left: FILE_SIZE * 12,
});
board.createEnemy({
  top: FILE_SIZE * 17,
  left: FILE_SIZE * 12,
});
board.createEnemy({
  top: FILE_SIZE * 17,
  left: FILE_SIZE * 12,
});
board.createEnemy({
  top: FILE_SIZE * 17,
  left: FILE_SIZE * 12,
});
board.createEnemy({
  top: FILE_SIZE * 17,
  left: FILE_SIZE * 12,
});
board.createHero({ top: FILE_SIZE * 17, left: FILE_SIZE * 1 });
board.createItem({
  item: "forniture",
  top: FILE_SIZE * 17,
  left: FILE_SIZE * 2,
});
board.createItem({
  item: "forniture",
  top: FILE_SIZE * 2,
  left: FILE_SIZE * 8,
});
board.createItem({
  item: "forniture",
  top: FILE_SIZE * 2,
  left: FILE_SIZE * 16,
});






