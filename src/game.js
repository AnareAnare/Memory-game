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
  function mainArray(numberOfCards) {
    let arr1 = [];
    let arr2 = [];
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

    function afterAnimation() {
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
        numbersArray = [];
      });
      alert('Победа! Принимайте поздравления!');
    }

    function delayedAfterAnimation() {
      setTimeout(afterAnimation, 2000);
    }

    function endOfTheGame() {
      const cardsAllSuccess = document.querySelectorAll('.success-style');

      function animationWinner() {
        const tl = gsap.timeline({ onComplete: delayedAfterAnimation });
        tl.to('.success-style', {
          keyframes: {
            '0%': { scale: 1 },
            '50%': { scale: 1.3, ease: 'power1.out' },
            '75%': { scale: 0.9 },
            '100%': { scale: 1.2 },
          },
          duration: 1,
          stagger: {
            amount: 0.5,
            grid: "auto",
            from: "center"
          }
        });
        tl.to('.success-style', {
          rotate: "random(50, 270)",
          stagger: {
            grid: "auto",
            from: "center",
            ease: "power3.out"
          }
        });
        tl.to('.success-style', {
          y: "random(100, 500)",
          stagger: {
            grid: "auto",
            from: "center",
            ease: "power3.out"
          }
        }, '<');
      }
      if (cardsAllSuccess.length == numbersArray.length) {
        animationWinner();
      }
    }
    button.addEventListener('click', () => {
      if (numbersPermitted.includes(+input.value)) {
        mainArray(+input.value);
        initialDiv.classList.add('vanish');
        central.classList.add('central-added');
        createMapField(+input.value);
        startAnimation('.animation-style');
      } else {
        wrongInput();
      }
    });

    function startAnimation(el) {
      let tl = gsap.timeline({ onComplete: removeTransform });
      tl.to(el, {y: 0, opacity: 1, stagger: {from: 0, amount: 0.5}});
      function removeTransform() {
        document.querySelectorAll('.shirt-style').forEach((item) => {
          item.classList.remove('animation-style');
          item.style.removeProperty('transform');
        });
      }
    }

    
    function createMapField(a) {
      let firstCard = null;
      let secondCard = null;
      const cards = a * a;
      const cardWidth = Math.floor(100 / a) - 1 + '%';
      for (let i = 0; i < cards; i++) {
        let card = document.createElement('div');
        card.classList.add('shirt-style', 'animation-style');
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
          endOfTheGame();
        });
      }
    }
  });
})();
