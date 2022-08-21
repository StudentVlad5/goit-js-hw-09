import Notiflix from 'notiflix';

const ref = {
  firstDelayTime : document.querySelector('input[name="delay"]'),
  stepForDelay : document.querySelector('input[name="step"]'),
  amountOfDelay : document.querySelector('input[name="amount"]'),
  btnStart: document.querySelector('button'),
  count : 1,
}

ref.firstDelayTime['min'] = 0;
ref.firstDelayTime['step'] = 1000;
ref.stepForDelay['min'] = 0;
ref.stepForDelay['step'] = 100;
ref.amountOfDelay['min'] = 1;
ref.amountOfDelay['step'] = 1;

ref.btnStart['disabled'] = true;
window.addEventListener('input', checkBtn);

function checkBtn () {
  if (ref.firstDelayTime.value && ref.stepForDelay.value && ref.amountOfDelay.value){
    ref.btnStart['disabled'] = false;
  }
}
ref.btnStart.addEventListener('click', startPromise)

function startPromise(event) {
  event.preventDefault();
 
let delay = +ref.firstDelayTime.value;
let step = +ref.stepForDelay.value;

  for (let i = 1; i <= ref.amountOfDelay.value; i += 1) {
    console.log(delay)
    delay += step;
    createPromise(i, delay)
 }

 function createPromise(i, delay) {
  
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
    if (shouldResolve) {
      resolve();
    } else {
      reject();
    }
  }, delay);
});
console.log(i, delay)
  promise.then(() => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
})
   .catch(() => {
    Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
});
}}