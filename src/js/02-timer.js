// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

const options = {
    enableTime: true,
    minDate: "today",
    maxDate: new Date().fp_incr(365),
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    console.log(selectedDates[0]);
    },
  };

const ref = {
    inputDate: document.querySelector('input'),
    startButton: document.querySelector('[data-start]'),
    containerForTime: document.querySelector('.timer'),
    divField: document.querySelectorAll('.field'),
    spanForTimeNumber: document.querySelectorAll('.value'),
    spanForTimeName: document.querySelectorAll('.label'),
    clockDays : document.querySelector('[data-days]'),
    clockHours : document.querySelector('[data-hours]'),
    clockMinutes : document.querySelector('[data-minutes]'),
    clockSeconds : document.querySelector('[data-seconds]'),
    currentDate: new Date(),
    timeNumber: 0,
    sec: 0,
    interval: '',
}


ref.inputDate.style.cssText +=
'width: 230px; height: 30px';
ref.startButton.style.cssText +=
'width: 50px; height: 30px';
ref.containerForTime.style.cssText += 
'display: flex; justify-content: space-between; align-items: center; width:300px; padding: 20px';
ref.divField.forEach((key)=>{key.style.cssText += 
'display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 20px;'});
ref.spanForTimeNumber.forEach((key)=>{key.style.cssText += 
    'font-size: 28px; font-weight: 600;'});
ref.spanForTimeName.forEach((key)=>{key.style.cssText += 
    'font-size: 12px; text-transform: uppercase; font-weight: 500;'});

flatpickr('#datetime-picker', options);
ref.startButton.disabled = true;

ref.inputDate.addEventListener('input',checkDates);
function checkDates(){
    if(ref.inputDate.value !== ref.inputDate.min){ 
        ref.startButton.disabled = false;
    }
}

function pad(value) {
    return String(value).padStart(2,'0')
}

ref.startButton.addEventListener('click', convertMs)

function convertMs () {
    ref.sec = (Date.parse(ref.inputDate.value) - Date.parse(new Date()))/1000;
    ref.startButton.disabled = true;
    interval = setInterval(countSeconds,1000);
}

const countSeconds = function countSeconds() {
        var min = ref.sec / 60;
        var hour = min / 60;
        var day =
            'Дней: ' + Math.floor(hour / 24) +
            ', часов: ' + Math.floor(hour % 24) +
            ', минут: ' + Math.floor(min % 60) +
            ', секунд: ' + Math.floor(ref.sec % 60);
        console.log(day);
        ref.sec -=1;
        
ref.clockDays.textContent = pad(Math.floor(hour / 24));
ref.clockHours.textContent = pad(Math.floor(hour % 24));
ref.clockMinutes.textContent = pad(Math.floor(min % 60));
ref.clockSeconds.textContent = pad(Math.floor(ref.sec % 60));

        if(ref.sec === 0) {
            clearInterval(interval);
            ref.startButton.disabled = false}
}