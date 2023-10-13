const getImage = (imageId, folderName) => {
	return `url(assets/icons/${folderName}/image${imageId}.png)`
}
const randomNum = ([min, max]) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}
const openCard = card => {
	card.firstElementChild.style.transform = 'rotateY(180deg)'
	card.lastElementChild.style.transform = 'rotateY(360deg)'
}
const closeCard = card => {
	card.firstElementChild.style.transform = 'rotateY(0deg)'
	card.lastElementChild.style.transform = 'rotateY(180deg)'
}
const checkForTwoNumbers = (array, number) => {
	let result = 0
	for (const el of array) {
		if (el === number) {
			if (result > 2) {
				break
			}
			result++
		}
	}
	return result < 2
}
const randomImgCards = cards => {
	let num
	cards.forEach((card, index) => {
		while (arrayCards.length < numberCards) {
			num = randomNum(minMAX)
			if (checkForTwoNumbers(arrayCards, num)) {
				arrayCards.push(num)
			}
		}
		card.style.backgroundImage = getImage(arrayCards[index], 'easy')
		card.style.backgroundPosition = '15px 20px'
		card.style.backgroundRepeat = 'no-repeat'
		card.style.backgroundSize = '80% 80%'
	})
}

document.addEventListener('DOMContentLoaded', function () {
	const complexitySelect = document.querySelector('.complexity')
	const mainContainer = document.querySelector('.main')
	const defaultDifficultyLevel = complexitySelect.value
	const card = document.querySelectorAll('.card')
	const arrayCards = [] // массив значений чтобы карточки не повторялись
	const minMAX = [1, 8] // кол карточек
	let numberCards = 16 //количесвто ячеек
	let testcard = null
	let ChecksСard = null

	complexitySelect.addEventListener('change', function () {
		let difficultyLevelValue = complexitySelect.value
		let numberOfCells = 0
		mainContainer.classList.remove('easy', 'average', 'difficult')

		if (difficultyLevelValue === '1') {
			numberCards = 16 //количесвто ячеек
			minMAX = [1, 8] // кол карточек
			numberOfCells = 16
			mainContainer.classList.add('easy')
		} else if (difficultyLevelValue === '2') {
			numberCards = 24 //количесвто ячеек
			minMAX = [1, 12] // кол карточек
			numberOfCells = 24
			mainContainer.classList.add('average')
		} else if (difficultyLevelValue === '3') {
			numberCards = 36 //количесвто ячеек
			minMAX = [1, 18] // кол карточек
			numberOfCells = 36
			mainContainer.classList.add('difficult')
		}

		let cards = document / querySelector('.cards')

		if (cards) {
			mainContainer.removeChild(cards)
		}

		const root = document.createElement('div')
		root.classList.add('cards')
		mainContainer.appendChild('root')

		while (cards.childElementCount < numberOfCells) {
			const cell = document.createElement('div')
			cell.className = 'CELL card-container'
			cell.innerHTML = `
                    <div class="card front"></div>
                    <div class="card back"></div>
            `
			mainContainer.appendChild(cell)
		}

		const cardBack = document.querySelectorAll('div')
		const cardContainer = document.querySelectorAll('.card-container')
		randomImgCards(cardBack)

		cardContainer.forEach((card, index) => {
			card.addEventListener('click', () => {
				if (card.getAttribute('data-disabled') !== 'true') {
					if (testcard === null) {
						testcard = index
						ChecksСard = arrayCards[index]
						openCard(card)
						card.setAttribute('data-disabled', 'true')
					} else {
						if (ChecksСard === arrayCards[index]) {
							openCard(card)
							cardContainer[index].setAttribute('data-disabled', 'true')
							cardContainer[testcard].setAttribute('data-disabled', 'true')
							return (testcard = null)
						} else if (ChecksСard !== arrayCards[index]) {
							openCard(card)
							setTimeout(() => {
								closeCard(card)
								closeCard(cardContainer[testcard])
								cardContainer[index].removeAttribute('data-disabled')
								cardContainer[testcard].removeAttribute('data-disabled')
								return (testcard = null)
							}, 500)
						}
					}
				}
			})
		})
	})
	complexitySelect.value = defaultDifficultyLevel
	complexitySelect.dispatchEvent(new Event('change'))
})

// inimize_Btn_Click = event => {
// 	ipcRenderer.send('minimize-window')
// }
// const close_Btn_Click = event => {
// 	ipcRenderer.send('close-window')
// }

// const minimizeBtn = document.querySelector('.minimize-button')
// const closeBtn = document.querySelector('.close-button')
// minimizeBtn.addEventListener('click', minimize_Btn_Click)
// closeBtn.addEventListener('click', close_Btn_Click)
