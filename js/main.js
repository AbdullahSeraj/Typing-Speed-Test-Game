// Array of words
const words = [
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing"
];

// Setting Levels
const lvls = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2
};


// Default Level
let defaultLevelName = document.querySelector('.level span.active').innerHTML;
let defaultLevelSeconds = lvls[defaultLevelName];

// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Disable Paste Event
input.onpaste = function() {
    return false;
}

// Level Change
let level = document.querySelector('.level');
let levelSpans = document.querySelectorAll('.level span');
let lvlKeys = Object.keys(lvls);

levelSpans.forEach((span) => {
    span.addEventListener('click', () => {
        levelSpans.forEach((span) => {
            span.classList.remove('active');
        })

        span.classList.add('active');
        change();
    })
});

function change() {
    defaultLevelName = document.querySelector('.level span.active').innerHTML;
    defaultLevelSeconds = lvls[defaultLevelName];

    lvlNameSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    scoreTotal.innerHTML = words.length;
}

startButton.onclick = function() {
    this.remove();
    input.focus();

    genWorks();
}

function genWorks() {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    let wordIndex = words.indexOf(randomWord);

    words.splice(wordIndex, 1);
    upcomingWords.innerHTML = "";
    theWord.innerHTML = randomWord;

    for(let i = 0; i < words.length; i++) {
        let createDiv = document.createElement("div");
        createDiv.innerHTML = words[i];
        upcomingWords.appendChild(createDiv);
    }

    level.style.display = 'none';

    startPlay();
}

function startPlay() {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;

        if(timeLeftSpan.innerHTML == 0) {
            clearInterval(start);

            if(theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                input.value = '';
                scoreGot.innerHTML++;

                if(words.length > 0) {
                    genWorks();
                } else {
                    let span = document.createElement('span');
                    span.className = 'good';
                    span.innerHTML = 'Congratulation';
                    finishMessage.appendChild(span);

                    upcomingWords.remove();
                }
            } else {
                let span = document.createElement('span');
                span.className = 'bad';
                span.innerHTML = 'Game Over';
                finishMessage.appendChild(span);
            }
        }
    }, 1000);
    


}