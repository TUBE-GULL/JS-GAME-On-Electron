const { ipcRenderer } = require("electron");

document.addEventListener("DOMContentLoaded", function () {
  const complexitySelect = document.querySelector(".complexity");
  const bodyContainer = document.querySelector(".body");
  const mainContainer = document.querySelector(".main");
  const defaultDifficultyLevel = complexitySelect.value;
  // const card = document.querySelectorAll('.card');
  const arrayCards = [];
  let minMAX = [1, 8];
  let numberCards = 16;
  let testcard = null;
  let ChecksCard = null;
  let complexity = "easy";

  const getImage = (imageId, folderName) => {
    return `url(assets/icons/${folderName}/image${imageId}.png)`;
  };

  const randomNum = ([min, max]) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const openCard = (card) => {
    card.lastElementChild.style.visibility = "visible";
    card.firstElementChild.style.transform = "rotateY(180deg)";
    card.lastElementChild.style.transform = "rotateY(360deg)";
  };

  const closeCard = (card) => {
    card.firstElementChild.style.transform = "rotateY(0deg)";
    card.lastElementChild.style.transform = "rotateY(180deg)";
  };

  const checkForTwoNumbers = (array, number) => {
    let result = 0;
    for (const el of array) {
      if (el === number) {
        if (result > 2) {
          break;
        }
        result++;
      }
    }
    return result < 2;
  };

  const randomImgCards = (cards) => {
    let num;
    cards.forEach((card, index) => {
      while (arrayCards.length < numberCards) {
        num = randomNum(minMAX);
        if (checkForTwoNumbers(arrayCards, num)) {
          arrayCards.push(num);
        }
      }
      card.style.backgroundImage = getImage(arrayCards[index], complexity);
    });
  };

  complexitySelect.addEventListener("change", function () {
    let difficultyLevelValue = complexitySelect.value;
    let numberOfCells = 0;
    mainContainer.classList.remove("junior", "middle", "senior");
    bodyContainer.classList.remove("junior", "middle", "senior");

    if (difficultyLevelValue === "1") {
      numberCards = 16;
      minMAX = [1, 8];
      complexity = "junior";
      numberOfCells = 16;
      mainContainer.classList.add("junior");
      bodyContainer.classList.add("junior");
    } else if (difficultyLevelValue === "2") {
      numberCards = 24;
      minMAX = [1, 12];
      complexity = "middle";
      numberOfCells = 24;
      mainContainer.classList.add("middle");
      bodyContainer.classList.add("middle");
    } else if (difficultyLevelValue === "3") {
      numberCards = 36;
      minMAX = [1, 18];
      complexity = "senior";
      numberOfCells = 36;
      mainContainer.classList.add("senior");
      bodyContainer.classList.add("senior");
    }
    let cards = document.querySelector(".cards");

    if (cards) {
      mainContainer.removeChild(cards);
    }

    cards = document.createElement("div");
    cards.classList.add("cards");
    // mainContainer.appendChild(cards);

    while (cards.childElementCount < numberOfCells) {
      const cell = document.createElement("div");
      cell.className = "CELL card-container";
      cell.innerHTML = `
                    <div class="card front"></div>
                    <div class="card back"></div>
            `;
      cards.appendChild(cell);
    }

    mainContainer.appendChild(cards);
    const cardContainer = document.querySelectorAll(".card-container");
    const cardBack = document.querySelectorAll(".back");
    randomImgCards(cardBack);

    cardContainer.forEach((card, index) => {
      card.addEventListener("click", () => {
        if (card.getAttribute("data-disabled") !== "true") {
          if (testcard === null) {
            testcard = index;
            ChecksCard = arrayCards[index];
            openCard(card);
            card.setAttribute("data-disabled", "true");
          } else {
            if (ChecksCard === arrayCards[index]) {
              openCard(card);
              cardContainer[index].setAttribute("data-disabled", "true");
              cardContainer[testcard].setAttribute("data-disabled", "true");
              return (testcard = null);
            } else if (ChecksCard !== arrayCards[index]) {
              openCard(card);
              setTimeout(() => {
                closeCard(card);
                closeCard(cardContainer[testcard]);
                cardContainer[index].removeAttribute("data-disabled");
                cardContainer[testcard].removeAttribute("data-disabled");
                return (testcard = null);
              }, 500);
            }
          }
        }
      });
    });
  });

  complexitySelect.value = defaultDifficultyLevel;
  complexitySelect.dispatchEvent(new Event("change"));
});

const minimize_Btn_Click = (event) => {
  ipcRenderer.send("minimize-window");
};
const close_Btn_Click = (event) => {
  ipcRenderer.send("close-window");
};

const minimizeBtn = document.querySelector(".minimize-button");
const closeBtn = document.querySelector(".close-button");
minimizeBtn.addEventListener("click", minimize_Btn_Click);
closeBtn.addEventListener("click", close_Btn_Click);
