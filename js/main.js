const launchAlarm = document.querySelector('.launchAlarm');
const alarm = document.querySelector('.alarm');
const closeBtn = document.querySelectorAll('.closeBtn');
const wakeUpBtn = document.querySelector('.wakeUpBtn');
const checkModal = document.querySelector('.checkModal');
const checkBtn = document.querySelector('.checkBtn');
const hour = document.querySelector('.h');
const min = document.querySelector('.m');
const sec = document.querySelector('.s');
const apm = document.querySelector('.ap');
const chechedText = document.querySelector('.cheched-text');
const inputText = document.querySelector('.input-text');
const selectedAll = document.querySelectorAll('select');
const dayName = document.querySelector('.dayName');
const pauseBtn = document.querySelector('.pauseBtn');
const bell = document.querySelector('.fa-bell');
const adelShakalAudio = new Audio('./../assets/audios/adel.mp3');
const sa7yElnoomAudio = new Audio('./../assets/audios/es7a.mp3');
const yaKadabAudio = new Audio('./../assets/audios/kadab.mp3');

const t = new Date();
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function updateTime() {
    const time = new Date();
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();

    apm.innerText = h >= 12 ? 'PM' : 'AM';
    hour.innerText = (h % 12 || 12) < 10 ? `0${h % 12 || 12}` : h % 12 || 12;
    min.innerText = m < 10 ? `0${m}` : m;
    sec.innerText = s < 10 ? `0${s}` : s;
}

function updateDay() {
    dayName.innerHTML = weekday[t.getDay()];
}

setInterval(updateTime, 1000);
updateTime();
updateDay();

launchAlarm?.addEventListener('click', () => {
    launchAlarm.classList.replace('d-block', 'd-none');
    alarm.classList.remove('d-none');
    alarm.classList.add('d-flex');
});

pauseBtn.addEventListener('click', () => {
    removeAlarmFromDom();
    checkModal.classList.replace('d-none', 'd-flex');
});

//? remove Alarm modal by Esc Btn
closeBtn[0].addEventListener('click', () => {
    removeAlarmFromDom();
    launchAlarm.classList.replace('d-none', 'd-block');
    adelShakalAudio.pause();
    yaKadabAudio.pause();
    sa7yElnoomAudio.pause();
} );
closeBtn[1].addEventListener('click', () => {
    if (checkModal.classList.contains('d-flex')) {
        checkModal.classList.replace('d-flex', 'd-none')
        launchAlarm.classList.replace('d-none', 'd-block')
        adelShakalAudio.pause()
        yaKadabAudio.pause();
        sa7yElnoomAudio.pause();
    }
} );

// Event delegation for clicking on alarm div
alarm.addEventListener('click', (e) => {
    if (e.target.classList.contains('alarm')) {
        removeAlarmFromDom();
        launchAlarm.classList.replace('d-none', 'd-block');
        adelShakalAudio.pause();
        yaKadabAudio.pause();
        sa7yElnoomAudio.pause();
    }
});

// Event listener for Escape key
window.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
        removeAlarmFromDom();
        adelShakalAudio.pause();
        yaKadabAudio.pause();
        sa7yElnoomAudio.pause();
        launchAlarm?.classList.replace('d-none', 'd-block');
    }
});

wakeUpBtn.addEventListener('click', () => {
    setInterval(() => {
        const selectedHour = parseInt(selectedAll[0].value);
        const selectedMin = parseInt(selectedAll[1].value);
        const selectedSec = parseInt(selectedAll[2].value);
        const selectedApm = selectedAll[3].value;
    
        const time = new Date();
        const h = time.getHours();
        const m = time.getMinutes();
        const s = time.getSeconds();
        const currentApm = h >= 12 ? 'PM' : 'AM';
    
        if (selectedApm === currentApm && selectedHour === (h % 12 || 12) && selectedMin === m && selectedSec === s) {
            adelShakalAudio.play();
            adelShakalAudio.loop = true;
            if (adelShakalAudio.play()) {
                bell.classList.replace('fa-beat', 'fa-shake')
            } else {
                bell.classList.replace('fa-shake', 'fa-beat')
            }
        }
    }, 1000)
});

function removeAlarmFromDom() {
    alarm.classList.replace('d-flex', 'd-none');
}

checkBtn.addEventListener('click', () => {
    if (chechedText.innerText === inputText.value) {
        adelShakalAudio.pause();
        sa7yElnoomAudio.play();
        yaKadabAudio.pause();
        sa7yElnoomAudio.loop = true;
    } else {
        adelShakalAudio.pause();
        sa7yElnoomAudio.pause();
        yaKadabAudio.play();
        yaKadabAudio.loop = true;
    }
});

function createOptions(select, max) {
    for (let i = 1; i <= max; i++) {
        const option = document.createElement('option');
        const optionText = document.createTextNode(i < 10 ? `0${i}` : i);
        option.appendChild(optionText);
        option.setAttribute('value', i < 10 ? `0${i}` : i);
        select.appendChild(option);
    }
}

createOptions(selectedAll[0], 12);
createOptions(selectedAll[1], 60);
createOptions(selectedAll[2], 60);
createAPM();

function createAPM() {
    const apmOptions = ['AM', 'PM'];
    for (const optionText of apmOptions) {
        const option = document.createElement('option');
        option.appendChild(document.createTextNode(optionText));
        selectedAll[3].appendChild(option);
    }
}

pauseBtn