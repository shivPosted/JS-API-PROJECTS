'use-strict';
const btn = document.querySelector('.btn');
const textArea = document.querySelector('#text--area');

textArea.value = '';

const texttospeech = function (text) {
  const whatToSpeak = new SpeechSynthesisUtterance(text);
  whatToSpeak.onend = function (event) {
    console.log(event, 'speeech has ended');
    btn.textContent = 'Convert to speech';
    btn.dataset.state = 0;
  };
  whatToSpeak.lang = `${navigator.language}`;
  return whatToSpeak;
};

const speak = function (txt) {
  const text = texttospeech(txt);
  window.speechSynthesis.speak(text);
  console.log(text);
};
const pause = function () {
  window.speechSynthesis.pause();
};
const resume = function () {
  window.speechSynthesis.resume();
};
btn.addEventListener('click', function () {
  const text = textArea.value;
  if (textArea.value === '') return;
  console.log(this);
  if (this.dataset.state == 0) {
    this.textContent = 'pause';
    speak(text);
    console.log(this.dataset.state);
    this.dataset.state = 1;
  } else if (this.dataset.state == 1) {
    this.textContent = 'resume';
    pause();
    this.dataset.state = 2;
  } else if (this.dataset.state == 2) {
    resume();
    this.textContent = 'pause';
    this.dataset.state = 1;
  }
});
