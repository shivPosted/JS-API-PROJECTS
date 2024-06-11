'use-strict';
const popUp = document.querySelector('.connection-pop-up');
const iconContainer = document.querySelector('.icon');
const icons = document.querySelectorAll('.svg--icon');
const timer = document.querySelector('.timer--connection');

const online = function () {
  popUp.classList.add('online');
  iconContainer.classList.add('online');
  icons.forEach(icon => {
    icon.classList.toggle('hidden');
  });
};

const offline = function () {
  popUp.classList.remove('online');
  iconContainer.classList.remove('online');
  icons.forEach(icon => {
    icon.classList.toggle('hidden');
  });

  const timerInterval = setInterval(() => {
    let seconds = 10;
    seconds--;
    timer.textContent = seconds;
    if (popUp.classList.contains('online')) {
      clearInterval(timerInterval);
    } else seconds = 10;
  }, 1000);
};
const apiUse = function () {
  fetch('https://jsonplaceholder.typicode.com/posts').then(response => {
    if (response.status >= 200 && response.status <= 300) {
      online();
    } else offline();
  });
};

// apiUse('https://jsonplaceholder.typicode.com/posts');
apiUse('https://jsonplaceholder.typicode.com/posts');

setTimeout(() => {
  popUp.classList.remove('connection-pop-up--hidden');
}, 10000);

const requestCycle = setInterval(() => {
  apiUse('https://jsonplaceholder.typicode.com/posts');
}, 10000);
