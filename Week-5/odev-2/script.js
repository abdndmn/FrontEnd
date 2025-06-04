function playSound(letter) {
  const sounds = {
    a: "boom",
    s: "clap",
    d: "tom",
    f: "hihat",
    g: "kick",
    h: "openhat",
    j: "ride",
    k: "snare",
    l: "tink"
  };

  const soundFile = sounds[letter];
  if (soundFile) {
    new Audio(`sound/${soundFile}.wav`).play();
  }
}


document.getElementById("a").addEventListener("click", () => playSound("a"));
document.getElementById("s").addEventListener("click", () => playSound("s"));
document.getElementById("d").addEventListener("click", () => playSound("d"));
document.getElementById("f").addEventListener("click", () => playSound("f"));
document.getElementById("g").addEventListener("click", () => playSound("g"));
document.getElementById("h").addEventListener("click", () => playSound("h"));
document.getElementById("j").addEventListener("click", () => playSound("j"));
document.getElementById("k").addEventListener("click", () => playSound("k"));
document.getElementById("l").addEventListener("click", () => playSound("l"));


document.addEventListener("keydown", function (event) {
  const key = event.key.toLowerCase();
  playSound(key);
});
