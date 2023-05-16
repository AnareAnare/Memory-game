(() => {
  let numbersArray = [];
  const numbersPermitted = [2, 4, 6, 8, 10];
  let numberOfPairs = null;
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  let arr1 = [];
  let arr2 = [];
  function mainArray(numberOfCards) {
    numberOfCards *= numberOfCards;
    numberOfPairs = numberOfCards / 2;
    for (let i = 1; i <= numberOfPairs; i++) {
      arr1.push(i);
    }
    arr2 = arr1.slice();
    numbersArray = [...arr1, ...arr2];
    shuffle(numbersArray);
    return numbersArray;
  }

  document.addEventListener('DOMContentLoaded', () => {
    let input = document.querySelector('.numbers');
    const central = document.querySelector('.central');
    const button = document.querySelector('.start-button');
    const initialDiv = document.querySelector('.initial');
    function wrongInput() {
      input.classList.add('wrong-input');
      input.value = 4;
      setTimeout(() => input.classList.remove('wrong-input'), 2000);
    }

    function endOfTheGame() {
      if (document.querySelectorAll('.success-style').length == numbersArray.length) {
        alert('Победа! Принимайте поздравления!');
        central.innerHTML = '';
        const endButton = document.createElement('button');
        endButton.classList.add('start-button');
        endButton.textContent = 'Сыграть ещё раз';
        central.append(endButton);
        endButton.addEventListener('click', () => {
          central.innerHTML = '';
          central.classList.remove('central-added');
          initialDiv.classList.remove('vanish');
          central.append(initialDiv);
        });
      }
    }
    button.addEventListener('click', () => {
      if (numbersPermitted.includes(+input.value)) {
        mainArray(+input.value);
        initialDiv.classList.add('vanish');
        central.classList.add('central-added');
        createMapField(+input.value);
      } else {
        wrongInput();
      }
    });
    function createMapField(a) {
      let firstCard = null;
      let secondCard = null;
      const cards = a * a;
      const cardWidth = Math.floor(100 / a) - 1 + '%';
      for (let i = 0; i < cards; i++) {
        let card = document.createElement('div');
        card.classList.add('shirt-style');
        card.style.width = cardWidth;
        card.style.height = cardWidth;
        card.textContent = numbersArray[i];
        central.append(card);
        card.addEventListener('click', () => {
          card.classList.add('card-style');
          if (firstCard !== null && secondCard !== null) {
            if (firstCard.textContent !== secondCard.textContent) {
              firstCard.classList.remove('card-style');
              secondCard.classList.remove('card-style');
              firstCard = null;
              secondCard = null;
            }
          }
          if (firstCard == null) {
            firstCard = card;
          } else {
            if (secondCard == null) {
              secondCard = card;
            }
          }
          if (firstCard !== null && secondCard !== null) {
            if (firstCard.textContent == secondCard.textContent) {
              firstCard.classList.add('success-style');
              secondCard.classList.add('success-style');
              firstCard = null;
              secondCard = null;
            }
          }
          setTimeout(endOfTheGame, 1000);
        });
      }
    }
  });
})();
