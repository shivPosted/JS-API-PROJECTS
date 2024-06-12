'use-strict';
const popUp = document.querySelector('.connection-pop-up');
const iconContainer = document.querySelector('.icon');
const icons = document.querySelectorAll('.svg--icon');
const timer = document.querySelector('.timer--connection');
const reconnectBtn = document.querySelector('.btn--reconnect');
const h3 = document.querySelector('h3');
const connectionDetails = document.querySelector('.connection-details > p');

console.log(connectionDetails);

let btnEvent, timerInterval;
const html = `Your network is unavailable.We will attempt to reconnect you in
          <span class="timer--connection">10</span> seconds`;

const online = function () {
  h3.textContent = connectionDetails.textContent = '';
  popUp.classList.add('online');
  iconContainer.classList.add('online');
  icons[0].classList.add('hidden');
  icons[1].classList.remove('hidden');
  reconnectBtn.classList.add('btn--disabled');
  h3.textContent = 'Restored Connection';
  connectionDetails.textContent =
    'Your device is now successfully connected to the internet';
  removeEventListener('click', btnEvent);
  clearInterval(timerInterval);
  setTimeout(() => {
    popUp.classList.add('connection-pop-up--hidden');
  }, 2000);
  apiUse();
};

const offline = function () {
  popUp.classList.remove('connection-pop-up--hidden');
  if (timerInterval) {
    clearInterval(timerInterval);
    timer.textContent = 10;
  }
  h3.textContent = connectionDetails.textContent = '';
  h3.textContent = 'Connection Lost';
  connectionDetails.insertAdjacentHTML('afterbegin', html);
  console.log(timer);
  popUp.classList.remove('online');
  iconContainer.classList.remove('online');
  icons[0].classList.remove('hidden');
  icons[1].classList.add('hidden');
  reconnectBtn.classList.remove('btn--disabled');

  let seconds = 10;
  timerInterval = setInterval(() => {
    console.log(timer.innerText);
    seconds--;
    timer.textContent = seconds;
    if (seconds === 0) apiUse();
  }, 1000);
};

btnEvent = reconnectBtn.addEventListener('click', function (e) {
  apiUse();
  console.log('event handled');
});

// apiUse('https://jsonplaceholder.typicode.com/posts');
// apiUse('https://jsonplaceholder.typicode.com/posts');

const apiUse = function () {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
      if (response.status >= 200 && response.status <= 300) online();
      else throw new Error('No network');
    })
    .catch(err => {
      console.log(err.message);
      offline();
    });
};

// const requestInterval = setInterval(() => {
//   apiUse();
// }, 10000);

online();
