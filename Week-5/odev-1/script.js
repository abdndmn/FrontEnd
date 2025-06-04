let name = prompt("Adınızı giriniz:");
let myName = document.querySelector("#myName");
myName.innerHTML = name;

function showTime() {
  const now = new Date();
  const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  let day = days[now.getDay()];
  let hours = now.getHours().toString().padStart(2, '0');
  let minutes = now.getMinutes().toString().padStart(2, '0');
  let seconds = now.getSeconds().toString().padStart(2, '0');

  let timeString = `${hours}:${minutes}:${seconds} ${day}`;
  document.getElementById("myClock").innerText = timeString;
}

showTime();
setInterval(showTime, 1000);
