// const { ipcRenderer } = require('electron');
const cards = document.querySelectorAll('.back');
const cardContainer = document.querySelector('.card-container');
const card = document.querySelectorAll('.card');
const arrayCards = [];
let isFlipped = false;

const getImage = (imageId, folderName) => {
    // fileName: `imageId${imageId}.png`,
    return `url(assets/icons/${folderName}/image${imageId}.png)`
};

const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const checkForTwoNumbers = (arr, num) => {
    const count = arr.reduce((acc, el) => (el === num ? acc + 1 : acc), 0);
    return count <= 2;
}

const randomImgCards = (cards) => {
    cards.forEach((card) => {
        let num;// number for fields
        do {
            num = randomNum(1, 8);
            arrayCards.push(num);
        } while (!checkForTwoNumbers(arrayCards, num));
        card.style.backgroundImage = getImage(num, 'easy')
        card.style.backgroundPosition = '0 15px';
        card.style.backgroundRepeat = 'no-repeat';
        card.style.backgroundSize = '100% 80%';
    });
};
randomImgCards(cards)

cardContainer.addEventListener('click', () => {
    if (!isFlipped) {
        cardContainer.style.transform = 'rotateY(180deg)';
    } else {
        cardContainer.style.transform = 'rotateY(0deg)';
    }
    isFlipped = !isFlipped;
});

// ФУНКЦИЯ ДОЛЖНА РАСПРЕДЕЛИТЬ КАРТИНКИ ПО ПОЛЮ 4Х4
// КАРТИНКИ НЕ ДОЛЖНЫ СОВПОДАТЬ ТОЕСТЬ ИХ ЗНАЧЕНИЯ НЕ ДОЛЖНО СОВПОДАТЬ БОЛЬШЕ ЧЕМ 2 РАЗА
// ПРИ НАЖАТИИ КАРТОЧКА ПЕРЕВОРАЧИВАЕТЬСЯ И ОСТАЕТЬСЯ ОТКРЫТОЙ ПАКА USER  НЕ НАЖМЕТ НА 2 КАРТАЧКУ
// ЕСЛИ КАРТОЧКИ СОВПОЖАЮТ КАРТОЧКИ ОСТАЮТЬСЯ ОТКРЫТЫМИ
// ЕСЛИ НЕ КАРТОЧКА КОТОРАЯ БЫЛА ОТКРЫТА (1) БУДЕТ ЗАКРЫТА 
//     const cardFilter = () => {
// }

const minimize_Btn_Click = (event) => {
    ipcRenderer.send('minimize-window');

}
const close_Btn_Click = (event) => {
    ipcRenderer.send('close-window');
}

const minimizeBtn = document.querySelector('.minimize-button');
const closeBtn = document.querySelector('.close-button');
minimizeBtn.addEventListener('click', minimize_Btn_Click);
closeBtn.addEventListener('click', close_Btn_Click);
