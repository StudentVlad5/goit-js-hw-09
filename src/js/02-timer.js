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
    correctMonth: '',
    correctDay: '',
    correctYear: '',
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


if(ref.currentDate.getMonth() < 10) {ref.correctMonth = `0${ref.currentDate.getMonth()+1}`} 
else {ref.correctMonth = ref.currentDate.getMonth()+1};
if(ref.currentDate.getDate() < 10) {ref.correctDay = `0${ref.currentDate.getDate()}`}
else {ref.correctDay = ref.currentDate.getDate()};
ref.correctYear = ref.currentDate.getFullYear();
ref.timeNumber = ref.currentDate.getTime();

ref.inputDate.type="date";
ref.inputDate.value = `${ref.correctYear}-${ref.correctMonth}-${ref.correctDay}`;
ref.inputDate.min = `${ref.correctYear}-${ref.correctMonth}-${ref.correctDay}`;
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
ref.startButton.addEventListener('click', startCount)

function startCount () {
    ref.sec = (Date.parse(ref.inputDate.value) - Date.parse(ref.inputDate.min))/1000;
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