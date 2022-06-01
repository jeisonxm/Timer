//Manejo de tiempo

// setTimeout(()=>{
//   console.log("Paso dos segundos");
// }, 2000)
// setTimeout(() => {
//   console.log("Se borro el interval");
//   clearInterval(myInterval);
// }, 3000);

//////////////////
let minuteSpan = document.querySelector("#minutes");
let secondSpan = document.querySelector("#seconds");
let vueltasDiv = document.querySelector("#vueltasContainer");
let milisecondSpan = document.querySelector("#miliseconds");
console.log(minuteSpan, secondSpan, milisecondSpan, vueltasDiv);
let minuteValue = 0;
let secondValue = 0;
let milisecondValue = 0;
let currentInterval;
let ContadorVueltas = 0;
let timeSave = [];
let newTime = [];
function formatText(value) {
  return ("0" + value).slice(-2);
}
function redondear(num) {
  var rounded = Math.round((num + Number.EPSILON) * 100) / 100;
  return rounded;
}

function startChronometer() {
  currentInterval = setInterval(() => {
    if (milisecondValue == 100) {
      secondValue += 1;
      milisecondValue = 0;
    } else {
      milisecondValue += 1;
    }
    if (secondValue === 60) {
      secondValue = 0;
      minuteValue += 1;
    }
    secondSpan.textContent = formatText(secondValue);
    milisecondSpan.textContent = formatText(milisecondValue);
    minuteSpan.textContent = minuteValue;
  }, 10);
}
function stopChronometer() {
  clearInterval(currentInterval);
}

function resetChronometer() {
  clearInterval(currentInterval);
  secondSpan.textContent = formatText(0);
  milisecondSpan.textContent = formatText(0);
  minuteSpan.textContent = 0;
  minuteValue = 0;
  secondValue = 0;
  milisecondValue = 0;
  vueltasDiv.innerHTML = "";
  ContadorVueltas = 0;
}

function saveLap() {
  const seconds = Number(`${secondValue}.${milisecondValue}`);
  timeSave.push({ minuteValue, seconds });
  console.log(timeSave);
  console.log(timeSave[ContadorVueltas].seconds);
  console.log(seconds);
  let minuteSave;
  let secondSave;

  if (ContadorVueltas === 0) {
    secondSave = seconds;
    minuteSave = minuteValue;
  } else {
    secondSave = redondear(seconds - timeSave[ContadorVueltas - 1].seconds);
    minuteSave = minuteValue - timeSave[ContadorVueltas - 1].minuteValue;
  }

  console.log(secondSave);

  ContadorVueltas += 1;
  vueltasDiv.innerHTML += `<div class="lap">
  <h5>Vuelta ${ContadorVueltas}</h5>
  <p>${minuteValue}:${secondValue}.${milisecondValue}</p>
  <p class="lapAdd">+${minuteSave}:${secondSave}</p>
  </div>`;
}
