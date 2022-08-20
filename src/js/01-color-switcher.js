const ref = {
    butnStart : document.querySelector('[data-start]'),
    butnStop : document.querySelector('[data-stop]'),
    paragraf: document.querySelector('p'),
    interval: '',
}

const divForButton = document.createElement('div');
divForButton.appendChild(ref.butnStart);
divForButton.appendChild(ref.butnStop);
ref.paragraf.appendChild(divForButton);

divForButton.style.cssText +=
  'display: flex; justify-content: center; align-items: center; width:100vw; height: 100vh; gap:20px';
ref.butnStop.style.cssText +=
  'text-transform: uppercase; height: 25px;'  
ref.butnStart.style.cssText +=
  'text-transform: uppercase; height: 25px;' 

ref.butnStart.addEventListener('click', startChangeColor)
ref.butnStop.addEventListener('click', stopChangeColor)

function startChangeColor () {
    ref.butnStart.disabled = true;
    ref.interval = setInterval(getRandomHexColor,1000)}

function getRandomHexColor() {
     divForButton.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

function stopChangeColor () {
  if(ref.butnStart.disabled){
    clearInterval(ref.interval);
    ref.butnStart.disabled = false;
}
}
