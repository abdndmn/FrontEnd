
// "Our Classes" butonları ve içerik alanını seçiyoruz
let btn = document.querySelector(".button-container");
let features = document.querySelector("#features-container")

// Menü simgesi ve menü barını seçiyoruz (mobil görünüm için)
const menuIcon = document.querySelector('.menu-icon');
const bar = document.querySelector('.bar');

// Menü simgesine tıklanınca menüyü aç/kapa yapıyoruz
menuIcon.addEventListener('click', () => {
    bar.classList.toggle('active');
});

// Sayfada scroll yapıldığında menü kapanıyor (mobil menü)
window.addEventListener('scroll', () => {
    if (bar.classList.contains('active')) {
        bar.classList.remove('active');
    }
});

// Menüdeki linklere tıklanınca da menüyü kapatıyoruz
document.querySelectorAll('.bar a').forEach(link => {
    link.addEventListener('click', () => {
        bar.classList.remove('active');
    });
});

// Our Classes kısmındaki butonlara tıklanınca ilgili fonksiyon çağrılıyor
btn.addEventListener("click", (e) => {
    // Animasyonu tetiklemek için class'ı kaldırıp tekrar ekliyoruz
    features.classList.remove("features-container");
    void features.offsetWidth;// reflow tetiklenmesi için
    features.classList.add("features-container");
     // Buton id'sine göre uygun fonksiyon çalışıyor
    switch(e.target.id) {
        case "yoga":
            yoga();
            break;
        case "group":
            group();
            break;
        case "solo":
            solo();
            break;
        case "stretch":
            stretch();
            break;
        default:
            return;    
    }
});

// --- Aşağıdaki fonksiyonlar ilgili butona göre bilgileri değiştirir ---

// Yoga butonuna basıldığında içerik güncellenir
function yoga() {
    document.querySelectorAll("#features-container h6")[0].innerHTML = "Why Are Your Yoga?";
    document.querySelectorAll("#features-container p")[0].innerHTML = `Lorem ipsum dolor sit amet consectetur adipisicing elit. In, nihil recusandae. Atque, illum corporisodio
    pariatur ad harum non, molestias maiores molestiae sapiente perferendis veniam earum fugit ipsum
    repellendus architecto ducimus explicabo reiciendis alias quasi culpa libero amet similique nisi!`;
    document.querySelectorAll("#features-container h6")[1].innerHTML = "When comes Yoga Your Time?";
    document.querySelectorAll("#features-container p")[1].innerHTML = `Saturday-Sunday: 8:00am - 10:000am`;
    document.querySelectorAll("#features-container p")[2].innerHTML = `Monday-Tuesday: 8:00am - 10:000am`;
    document.querySelectorAll("#features-container p")[3].innerHTML = `Wednesday-Friday: 8:00am - 10:000am`;
    document.querySelector("#features-container img").src = "images/yoga.jpg";
}

// Group butonuna basıldığında içerik güncellenir
function group() {
    document.querySelectorAll("#features-container h6")[0].innerHTML = "Why Are Your Group?";
    document.querySelectorAll("#features-container p")[0].innerHTML = `Lorem ipsum dolor sit amet consectetur adipisicing elit. In, nihil recusandae. Atque, illum corporisodio
    pariatur ad harum non, molestias maiores molestiae sapiente perferendis veniam earum fugit ipsum`;
    document.querySelectorAll("#features-container h6")[1].innerHTML = "When comes Group Your Time?";
    document.querySelectorAll("#features-container p")[1].innerHTML = `Saturday-Sunday: 8:00am - 10:000am`;
    document.querySelectorAll("#features-container p")[2].innerHTML = `Monday-Tuesday: 8:00am - 10:000am`;
    document.querySelectorAll("#features-container p")[3].innerHTML = `Wednesday-Friday: 8:00am - 10:000am`;
    document.querySelector("#features-container img").src = "images/group.webp";
}

// Solo butonuna basıldığında içerik güncellenir
function solo() {
    document.querySelectorAll("#features-container h6")[0].innerHTML = "Why Are Your Solo?";
    document.querySelectorAll("#features-container p")[0].innerHTML = `In, nihil recusandae. Atque, illum corporisodio
    pariatur ad harum non, molestias maiores molestiae sapiente perferendis veniam earum fugit ipsum
    repellendus architecto ducimus explicabo reiciendis alias quasi culpa libero amet similique nisi!`;
    document.querySelectorAll("#features-container h6")[1].innerHTML = "When comes Solo Your Time?";
    document.querySelectorAll("#features-container p")[1].innerHTML = `Saturday-Sunday: 8:00am - 10:000am`;
    document.querySelectorAll("#features-container p")[2].innerHTML = `Monday-Tuesday: 8:00am - 10:000am`;
    document.querySelectorAll("#features-container p")[3].innerHTML = `Wednesday-Friday: 8:00am - 10:000am`;
    document.querySelector("#features-container img").src = "images/solo.jpg";
}

// Stretch butonuna basıldığında içerik güncellenir
function stretch() {
    document.querySelectorAll("#features-container h6")[0].innerHTML = "Why Are Your Stretch?";
    document.querySelectorAll("#features-container p")[0].innerHTML = `Lorem ipsum dolor sit amet consectetur adipisicing elit. In, nihil recusandae. Atque, illum corporisodio
    pariatur ad harum non, molestias maiores molestiae sapiente perferendis veniam earum fugit ipsum
    repellendus architecto ducimus explicabo reiciendis alias quasi culpa libero amet similique nisi!`;
    document.querySelectorAll("#features-container h6")[1].innerHTML = "When comes Stretch Your Time?";
    document.querySelectorAll("#features-container p")[1].innerHTML = `Saturday-Sunday: 8:00am - 10:000am`;
    document.querySelectorAll("#features-container p")[2].innerHTML = `Monday-Tuesday: 8:00am - 10:000am`;
    document.querySelectorAll("#features-container p")[3].innerHTML = `Wednesday-Friday: 8:00am - 10:000am`;
    document.querySelector("#features-container img").src = "images/stret.webp";
}

// --- BMI Hesaplama Fonksiyonu ---

// Gerekli elementleri seçiyoruz
const triangle = document.querySelector(".triangle");
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");

// Her input'a veri girildikçe BMI hesaplaması yapılır
heightInput.addEventListener("input", calculateBMI);
weightInput.addEventListener("input", calculateBMI);

function calculateBMI() {
  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);
  // Geçersiz veri varsa üçgen gizleniyor
  if (!height || !weight || height <= 0 || weight <= 0) {
    triangle.style.left = `-9999px`; // hide triangle
    return;
  }
// BMI formülü ile hesaplama
  const bmi = weight / ((height / 100) ** 2);
  let percentage = 0;
  // BMI değerine göre üçgenin konumu belirleniyor
  if (bmi >= 13.5 && bmi < 18.5) {
    percentage = 7 + ((bmi - 13.5) * 16) / 5;
  } else if (bmi >= 18.5 && bmi < 25) {
    percentage = 23 + ((bmi - 18.5) * 16) / 6.5;
  } else if (bmi >= 25 && bmi < 40) {
    percentage = 40 + ((bmi - 25) * 16) / 15;
  }
  // Üçgen belirtilen alanda kalıyorsa konumlandır
  if (percentage >= 6 && percentage <= 88) {
    triangle.style.left = `${percentage}%`;
  }
}


// --- Navbar scroll ile arka plan rengini değiştirir ---
function changeBg() {
    let navbar = document.querySelector("nav");
    let scrollValue = window.scrollY;
    if(scrollValue < 700) {
        navbar.classList.remove('bgColor');
    } else {
        navbar.classList.add('bgColor');
    }
}
window.addEventListener('scroll',changeBg);