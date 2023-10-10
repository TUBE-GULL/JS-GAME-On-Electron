// const { ipcRenderer } = require('electron');
const cardContainer = document.querySelectorAll('.card-container');
const cards = document.querySelectorAll('.back');
const card = document.querySelectorAll('.card');
const arrayCards = [];
const minMAX = [1, 8];



const openCard = ({ frontCard, backCard }) => {
    frontCard.style.transform = 'rotateY(180deg)';
    backCard.style.transform = 'rotateY(360deg)';
};
const closeCard = ({ frontCard, backCard }) => {
    frontCard.style.transform = 'rotateY(0deg)';
    backCard.style.transform = 'rotateY(180deg)';
}

const getImage = (imageId, folderName) => {
    return `url(assets/icons/${folderName}/image${imageId}.png)`
};

const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkForTwoNumbers = (array, number) => {
    let count = 0;
    for (const el of array) {
        if (el === number) {
            count++;
            if (count > 2) {
                return false;
            }
        }
    }
    return true;
};

const randomImgCards = (cards) => {
    cards.forEach((card) => {
        let num;
        do {
            num = randomNum(...minMAX);
            arrayCards.push(num)
        } while (!checkForTwoNumbers(arrayCards, num));
        card.style.backgroundImage = getImage(num, 'easy')
        card.style.backgroundPosition = '0 15px';
        card.style.backgroundRepeat = 'no-repeat';
        card.style.backgroundSize = '100% 80%';
    });
};
randomImgCards(cards);




const oneCard = {
    frontCard: null,
    backCard: null,
    indexCard: null,
    offNoCard: false
};
const secondCard = {
    frontCard: null,
    backCard: null,
    indexCard: null,
    offNoCard: false
};

// let isFlipped = false;
// let comparisonСard;
// let doubleClickLock = false;
let start = false;
cardContainer.forEach((card, index) => {
    card.addEventListener('click', () => {

        if (!start) {
            console.log('1')
            oneCard.frontCard = card.querySelector('.front');
            oneCard.backCard = card.querySelector('.back');
            oneCard.indexCard = index;
            start = true
            openCard(oneCard);
        } else {

            if (oneCard.indexCard === index) {
                console.log('2.1')
                setTimeout(() => {
                    closeCard(oneCard);
                    start = false;
                }, 100);
                return oneCard.indexCard = null
            } else {
                console.log('2.2')
                secondCard.frontCard = card.querySelector('.front');
                secondCard.backCard = card.querySelector('.back');
                secondCard.indexCard = index;
                openCard(secondCard);
            };
            if (oneCard.indexCard !== secondCard.indexCard) {
                console.log('2.3')
                setTimeout(() => {
                    closeCard(oneCard);
                    closeCard(secondCard)
                    start = false;
                }, 100);
            }
            start = !start;
        }
    });
});
const minimize_Btn_Click = (event) => {
    ipcRenderer.send('minimize-window');
};
const close_Btn_Click = (event) => {
    ipcRenderer.send('close-window');
};

const minimizeBtn = document.querySelector('.minimize-button');
const closeBtn = document.querySelector('.close-button');
minimizeBtn.addEventListener('click', minimize_Btn_Click);
closeBtn.addEventListener('click', close_Btn_Click);



// const frontCard = card.querySelector('.front')
// const backCard = card.querySelector('.back')
// // newCardInIteration = card.lastElementChild.style.backgroundImage;

//     if (!isFlipped) {
//         mapSpread()
//         comparisonСard = newCardInIteration;
//         previousCard.frontCard = card.querySelector('.front')
//         previousCard.backCard = card.querySelector('.back')
//         previousCard.indexCard = index;
//     } else {
//         doubleClickLock = true;
//         if (previousCard.indexCard === index) {
//             setTimeout(() => {
//                 NOmapSpread(previousCard);
//                 doubleClickLock = false;///<------------
//                 return previousCard.indexCard = null
//             }, 400);
//         } else {
//             mapSpread()
//             currentCard.frontCard = card.querySelector('.front')
//             currentCard.backCard = card.querySelector('.back')
//         };
//         if (comparisonСard !== newCardInIteration) {
//             setTimeout(() => {
//                 NOmapSpread(previousCard);
//                 NOmapSpread(currentCard)
//                 isFlipped = false;
//                 doubleClickLock = false;///<------------
//             }, 500);
//         }
//         doubleClickLock = false;
//         // if (comparisonСard === newCardInIteration) {
//         //     doubleClickLock = true; // Разрешаем нажатия снова
//         // } else {
//         //     doubleClickLock = false; // Блокируем нажатия до следующего клика
//         // }
//     }
//     previousCard.card = card;
//     isFlipped = !isFlipped;//true

// });