'use-strict';
const btn = document.querySelector('.btn');
const textArea = document.querySelector('#text--area');

textArea.value = '';

let state = 0;
const texttospeech = function (text) {
  const whatToSpeak = new SpeechSynthesisUtterance(text);
  whatToSpeak.onend = function (event) {
    console.log(event, 'speeech has ended');
    btn.textContent = 'Convert to speech';
    state = 0;
  };
  whatToSpeak.lang = `${navigator.language}`;
  return whatToSpeak;
};

const speak = function (txt) {
  const text = texttospeech(txt);
  window.speechSynthesis.speak(text);
  state = 1;
};
const pause = function () {
  window.speechSynthesis.pause();
  state = 2;
};
const resume = function () {
  window.speechSynthesis.resume();
  state = 1;
};
btn.addEventListener('click', function () {
  const text = textArea.value;
  if (!text) return;
  if (state === 0 && text) {
    speak(text);
    this.textContent = 'pause';
  } else if (state === 1 && text) {
    this.textContent = 'resume';
    pause();
  } else {
    resume();
    this.textContent = 'pause';
  }
});
