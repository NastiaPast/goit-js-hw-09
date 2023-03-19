function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startButtonEl = document.querySelector('[data-start]');
const stopButtonEl = document.querySelector('[data-stop]');

let intervalId = null;

startButtonEl.addEventListener('click', () => {
  startButtonEl.disabled = true;
  stopButtonEl.disabled = false;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopButtonEl.addEventListener('click', () => {
  startButtonEl.disabled = false;
  stopButtonEl.disabled = true;
  clearInterval(intervalId);
});
