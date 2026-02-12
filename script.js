// --- Configuration ---
const TARGET_DATE = new Date("2026-03-30T00:00:00").getTime(); // <--- ΑΛΛΑΞΕ ΤΗΝ ΗΜΕΡΟΜΗΝΙΑ ΕΔΩ (Format: YYYY-MM-DDTHH:MM:SS)
const MUSIC_FILE = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // <--- ΒΑΛΕ ΤΟ LINK ΤΟΥ ΤΡΑΓΟΥΔΙΟΥ ΣΟΥ ΕΔΩ

// --- Elements ---
const intro = document.getElementById('intro');
const mainContent = document.getElementById('main-content');
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-control');

// --- Functions ---

function openGift() {
    intro.style.opacity = '0';
    setTimeout(() => {
        intro.style.display = 'none';
        mainContent.classList.remove('hidden');
        
        // Trigger reflow to enable transition
        void mainContent.offsetWidth; 
        mainContent.style.opacity = '1';

        // Try to play music (browser policy requires user interaction first)
        playMusic();
    }, 1000);
}

function playMusic() {
    bgMusic.volume = 0.5;
    bgMusic.play().then(() => {
        musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
    }).catch(error => {
        console.log("Autoplay prevented. User needs to interact.", error);
        musicBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    });
}

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
    } else {
        bgMusic.pause();
        musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
}

// --- Countdown Logic ---
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateCountdown() {
    const now = new Date().getTime();
    const distance = TARGET_DATE - now;

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = "<h2>Είμαστε μαζί! ❤️</h2>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = days < 10 ? '0' + days : days;
    hoursEl.innerText = hours < 10 ? '0' + hours : hours;
    minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// --- Falling Hearts Animation ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s"; // 2-5s duration
    heart.style.fontSize = Math.random() * 1.5 + 0.5 + "rem"; // Random size
    
    document.getElementById('hearts-container').appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);
