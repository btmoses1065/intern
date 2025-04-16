const sentenceElement = document.getElementById("sentence");
const inputField = document.getElementById("typing-input");
const startBtn = document.getElementById("start-btn");
const timeElement = document.getElementById("time");
const speedElement = document.getElementById("speed");

const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "To be or not to be, that is the question.",
  "A journey of a thousand miles begins with a single step.",
  "All that glitters is not gold.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts."
];

let time = 0;
let timer;
let startTime;
let wordsTyped = 0;
let currentSentence = "";

function startTest() {
  // Pick a random sentence
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  sentenceElement.textContent = currentSentence;

  // Clear input field and start timing
  inputField.value = "";
  inputField.disabled = false;
  inputField.focus();
  wordsTyped = 0;
  time = 0;
  timeElement.textContent = time;
  speedElement.textContent = 0;

  // Start the timer
  startTime = Date.now();
  timer = setInterval(updateTime, 1000);

  // Enable input field and reset button
  startBtn.disabled = true;
}

function updateTime() {
  time = Math.floor((Date.now() - startTime) / 1000);
  timeElement.textContent = time;

  // Calculate words per minute (WPM)
  wordsTyped = countWords(inputField.value);
  let speed = Math.floor((wordsTyped / time) * 60);
  speedElement.textContent = speed;
}

function countWords(text) {
  return text.trim().split(/\s+/).length;
}

inputField.addEventListener("input", () => {
  if (inputField.value === currentSentence) {
    clearInterval(timer);
    inputField.disabled = true;
    startBtn.disabled = false;
    alert(`Test completed! Your typing speed is ${speedElement.textContent} WPM.`);
  }
});

startBtn.addEventListener("click", startTest);