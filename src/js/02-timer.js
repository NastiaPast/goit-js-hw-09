import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const datePickerEl = document.querySelector('#datetime-picker');
const startButtonEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timerInterval = null;
let comingDate = 0;
let dateSelected = false;
startButtonEl.setAttribute('disabled', 'true');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (!dateSelected) {
      startButtonEl.removeAttribute('disabled');
      comingDate = selectedDates[0];
      if (comingDate.getTime() < Date.now()) {
        startButtonEl.setAttribute('disabled', 'true');
        Notify.failure('Please choose a date in the future');
      } else {
        dateSelected = true;
      }
    }
  },
};

flatpickr(datePickerEl, options);
startButtonEl.addEventListener('click', handleBtnClick);

function handleBtnClick() {
  startButtonEl.setAttribute('disabled', 'true');
  const datePickerInstance = flatpickr(datePickerEl);
  datePickerInstance.destroy();
  datePickerEl.disabled = true;
  const startTimer = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = comingDate - currentTime;

    if (deltaTime < 900) {
      clearInterval(timerInterval);
      startButtonEl.setAttribute('disabled', 'true');
      clearInterval(startTimer);
    }
    const textTime = convertMs(deltaTime);
    secondsEl.textContent = textTime.seconds;
    minutesEl.textContent = textTime.minutes;
    hoursEl.textContent = textTime.hours;
    daysEl.textContent = textTime.days;
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
