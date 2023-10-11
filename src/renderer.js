const cardContainer = document.querySelectorAll('.card-container');
const cardBack = document.querySelectorAll('.back');
const card = document.querySelectorAll('.card');
const arrayCards = [];  // массив значений чтобы карточки не повторялись 
const minMAX = [1, 8];  // кол карточек 
let numberCards = 16;   //количесвто ячеек 
let testcard = null;
let ChecksСard = null;

const getImage = (imageId, folderName) => {
    return `url(assets/icons/${folderName}/image${imageId}.png)`
};
const randomNum = ([min, max]) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const openCard = (card) => {
    card.firstElementChild.style.transform = 'rotateY(180deg)';
    card.lastElementChild.style.transform = 'rotateY(360deg)';
};
const closeCard = (card) => {
    card.firstElementChild.style.transform = 'rotateY(0deg)';
    card.lastElementChild.style.transform = 'rotateY(180deg)';
};
const checkForTwoNumbers = (array, number) => {
    let result = 0;
    for (const el of array) {
        if (el === number) {
            if (result > 2) {
                break;
            }
            result++
        }
    };
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
        card.style.backgroundImage = getImage(arrayCards[index], 'easy');
        card.style.backgroundPosition = '15px 20px';
        card.style.backgroundRepeat = 'no-repeat';
        card.style.backgroundSize = '80% 80%';
    });
};
randomImgCards(cardBack);
cardContainer.forEach((card, index) => {
    card.addEventListener('click', () => {
        if (card.getAttribute('data-disabled') !== 'true') {
            if (testcard === null) {
                testcard = index
                ChecksСard = arrayCards[index]
                openCard(card)
                card.setAttribute('data-disabled', 'true');
            } else {
                if (ChecksСard === arrayCards[index]) {
                    openCard(card)
                    cardContainer[index].setAttribute('data-disabled', 'true');
                    cardContainer[testcard].setAttribute('data-disabled', 'true');
                    return testcard = null;
                } else if (ChecksСard !== arrayCards[index]) {
                    openCard(card)
                    setTimeout(() => {
                        closeCard(card)
                        closeCard(cardContainer[testcard])
                        cardContainer[index].removeAttribute('data-disabled');
                        cardContainer[testcard].removeAttribute('data-disabled');
                        return testcard = null;
                    }, 500)
                }
            }
        }
    });
});
// 4х4
// 6х6
// 8х8
// line            строка
// forduplication  ячейка

const EASY = {
    easyLine: 4,
    easyForduplication: 4,
    min: 1,
    max: 8,
    numberCards: 16,
};
const AVERAGE = {
    averageLine: 4,
    averageForduplication: 6,
    min: 1,
    max: 12,
    numberCards: 24,
};
const DIFFICULT = {
    difficulLine: 6,
    difficulForduplication: 6,
    min: 1,
    max: 18,
    numberCards: 24,
};

document.addEventListener("DOMContentLoaded", function () {
    const difficultyLevel = document.getElementById(".difficultyLevel");
    const CELL = document.querySelector(".CELL");
    const LINE = document.querySelector(".line");

    difficultyLevel.addEventListener("change", function () {
        let difficultyLevelValue = difficultyLevel.value;
        let cell = 4;
        let line = 4;

        if (difficultyLevelValue === "1") {
            line = EASY.difficulLine//ЛИНИИ 
            cell = EASY.difficulForduplication//ЯЧЕЙКА 
        } else if (difficultyLevelValue === "2") {
            line = AVERAGE.difficulLine//ЛИНИИ 
            cell = AVERAGE.difficulForduplication//ЯЧЕЙКА 
        } else if (difficultyLevelValue === "3") {
            line = DIFFICULT.difficulLine//ЛИНИИ 
            cell = DIFFICULT.difficulForduplication//ЯЧЕЙКА 
        }
        // Обновляем содержимое элемента #fileCount
        CELL.textContent += cell;
        LINE.textContent += line;
    });
});











































inimize_Btn_Click = (event) => {
    ipcRenderer.send('minimize-window');
};
const close_Btn_Click = (event) => {
    ipcRenderer.send('close-window');
};

const minimizeBtn = document.querySelector('.minimize-button');
const closeBtn = document.querySelector('.close-button');
minimizeBtn.addEventListener('click', minimize_Btn_Click);
closeBtn.addEventListener('click', close_Btn_Click);


/** 
 * 
const comparisonOneCard = {
    frontCard: null,
    backCard: null,
    index: null,
    offOn: true,
    block: 'auto',

};
let comparisonTwoCard = {
    front: null,
    back: null,
    index: null,
    offOn: true,
    block: 'auto',
}
let start = true;
    const blockCard = (card) => {
        card.style.pointerEvents = 'none';
    };
    const unblockCard = () => {
        card.style.pointerEvents = 'auto'
    };

    const reset = () => {
        setTimeout(() => {
            comparisonOneCard.frontCard = null
            comparisonOneCard.backCard = null
            comparisonOneCard.index = null
            comparisonOneCard.offOn = true
            comparisonOneCard.block = 'auto'
            comparisonTwoCard.front = null
            comparisonTwoCard.back = null
            comparisonTwoCard.index = null
            comparisonTwoCard.offOn = true
            comparisonTwoCard.block = 'auto'
            start = true
        }, 700)
    };
    if (start) {
        console.log(1)
        if (comparisonOneCard.offOn) {
            comparisonOneCard.frontCard = card.querySelector('.front');
            comparisonOneCard.backCard = card.querySelector('.back');
            comparisonOneCard.index = arrayCards[index]
            comparisonOneCard.offOn = false
            comparisonOneCard.block = 'none'
            openCard()
            // card.disabled = true;
            start = false
        }
    } else {
        console.log(2)
        if (comparisonOneCard.index === arrayCards[index]) {
            if (comparisonTwoCard.offOn) {
                console.log('ровны !')
                comparisonTwoCard.frontCard = card.querySelector('.front');
                comparisonTwoCard.backCard = card.querySelector('.back');
                comparisonTwoCard.index = arrayCards[index]
                comparisonTwoCard.offOn = false
                comparisonOneCard.block = 'none'
                openCard()
                // card.disabled = true;
                return reset()
            }
        };
        if (comparisonOneCard.index !== arrayCards[index]) {
            if (comparisonTwoCard.offOn) {
                console.log('не ровны !')
                comparisonTwoCard.frontCard = card.querySelector('.front');
                comparisonTwoCard.backCard = card.querySelector('.back');
                comparisonTwoCard.offOn = false
                comparisonTwoCard.block = 'none'
                openCard()
                setTimeout(() => {
                    closeCard(comparisonTwoCard);
                    closeCard(comparisonOneCard);
                    unblockCard(card);
                }, 500);
                reset()
            }
        }
    }
}); */
