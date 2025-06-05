import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const inputElement = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let userSelectedDate = null
let timerInterval = null


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0]

    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        timeout: 3000,
        theme: 'dark'
      });
    } else {
      startButton.disabled = false
      userSelectedDate = selectedDate
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function dateTimer(){
  if (!userSelectedDate){
    return
  }

  const timeNow = new Date().getTime()
  const targetTime = userSelectedDate.getTime()
  const timeDiff = targetTime - timeNow

  if (timeDiff <= 0){
    clearInterval(timerInterval)
    timerInterval = null

    inputElement.disabled = false

    daysElement.textContent = '00';
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';

    return
  }

  const convertedTimeDiff = convertMs(timeDiff)

  daysElement.textContent = addLeadingZero(convertedTimeDiff.days)
  hoursElement.textContent = addLeadingZero(convertedTimeDiff.hours)
  minutesElement.textContent = addLeadingZero(convertedTimeDiff.minutes)
  secondsElement.textContent = addLeadingZero(convertedTimeDiff.seconds)
}

startButton.addEventListener('click', () => {
  startButton.disabled = true
  inputElement.disabled = true
  timerInterval = setInterval(dateTimer, 1000)

})


startButton.disabled = true

flatpickr(inputElement, options)