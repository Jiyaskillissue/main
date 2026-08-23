"use strict";

let pleaseCount = 0;
let musicStarted = false;
let volumeIncreaseTimer = null;

const START_VOLUME = 0.01;
const MAX_VOLUME = 0.20;
const VOLUME_STEP = 0.01;
const VOLUME_INTERVAL = 3000;

const pandaResting =
    "https://static.vecteezy.com/system/resources/previews/057/384/320/large_2x/cute-cartoon-panda-lying-on-the-floor-resting-with-a-cheerful-face-this-adorable-illustration-is-great-for-kids-designs-animal-lovers-and-creative-projects-with-a-kawaii-theme-vector.jpg";

const pandaWaving =
    "https://static.vecteezy.com/system/resources/previews/020/815/620/large_2x/panda-cartoon-waving-paw-hand-vector.jpg";

const pandaGoodbye =
    "https://static.vecteezy.com/system/resources/previews/024/106/639/large_2x/illustration-of-happy-panda-waving-cute-cartoon-free-vector.jpg";

const pandaLeaning =
    "https://static.vecteezy.com/system/resources/previews/001/339/865/large_2x/cute-panda-leaning-on-wall-cartoon-vector.jpg";

const pandaCrying =
    "https://static.vecteezy.com/system/resources/previews/047/844/717/large_2x/cute-panda-crying-cartoon-vector.jpg";

const pandaDetective =
    "https://static.vecteezy.com/system/resources/previews/053/106/014/large_2x/cute-panda-detective-holding-gun-cartoon-vector.jpg";

const pandaLaptop =
    "https://static.vecteezy.com/system/resources/previews/040/329/163/large_2x/cute-panda-working-with-laptop-vector.jpg";

const pandaBackgroundProcess =
    "https://static.vecteezy.com/system/resources/previews/007/404/194/large_2x/cute-panda-operating-laptop-cartoon-icon-illustration-animal-technology-icon-concept-isolated-premium-flat-cartoon-style-vector.jpg";

const pandaTeasing =
    "https://static.vecteezy.com/system/resources/previews/073/937/818/large_2x/panda-teasing-tongue-out-illustration-vector.jpg";

const pandaLove =
    "https://static.vecteezy.com/system/resources/previews/026/954/596/large_2x/panda-sitting-love-cute-flat-design-vector.jpg";

const pandaMalware =
    "https://static.vecteezy.com/system/resources/previews/054/996/739/large_2x/a-cartoon-panda-bear-sitting-down-with-his-hands-folded-free-vector.jpg";

const pandaYouAgain =
    "https://static.vecteezy.com/system/resources/previews/044/639/279/large_2x/cute-panda-illustration-vector.jpg";

const pandaFinal =
    "https://static.vecteezy.com/system/resources/previews/011/170/770/large_2x/cute-baby-panda-love-cartoon-illustration-panda-cartoon-flat-design-with-heart-for-sticker-banner-poster-packaging-children-book-cover-free-vector.jpg";

function addPandaImages() {
    document.querySelectorAll(".page").forEach(function(page) {
        const image = document.createElement("img");

        image.className = "panda-image";
        image.alt = "Cute panda";

        if (page.id === "start" || page.id === "not-shri") {
            image.src = pandaResting;
        } else if (page.id === "sad") {
            image.src = pandaCrying;
        } else if (page.id === "boss") {
            image.src = pandaDetective;
        } else if (page.id === "already-boss") {
            image.src = pandaTeasing;
        } else if (page.id === "mind") {
            image.src = pandaLaptop;
        } else if (page.id === "process") {
            image.src = pandaBackgroundProcess;
        } else if (page.id === "malware") {
            image.src = pandaMalware;
        } else if (page.id === "one-thought") {
            image.src = pandaLove;
        } else if (page.id === "you-again") {
            image.src = pandaYouAgain;
        } else if (page.id === "goodbye") {
            image.src = pandaGoodbye;
        } else if (page.id === "final") {
            image.src = pandaFinal;
        } else {
            image.src = pandaLeaning;
        }

        image.onerror = function() {
            image.style.display = "none";
        };

        page.insertBefore(image, page.firstElementChild);
    });
}

function setPandaImage(pageId, imageUrl) {
    const page = document.getElementById(pageId);
    const image = page ? page.querySelector(".panda-image") : null;

    if (image) {
        image.src = imageUrl;
        image.style.display = "block";
    }
}

function startGradualVolumeIncrease() {
    if (volumeIncreaseTimer || !bgMusic) {
        return;
    }

    volumeIncreaseTimer = setInterval(function() {
        if (bgMusic.volume >= MAX_VOLUME) {
            bgMusic.volume = MAX_VOLUME;
            clearInterval(volumeIncreaseTimer);
            volumeIncreaseTimer = null;
            return;
        }

        bgMusic.volume = Math.min(
            bgMusic.volume + VOLUME_STEP,
            MAX_VOLUME
        );
    }, VOLUME_INTERVAL);
}

function goTo(pageId) {
    const target = document.getElementById(pageId);

    if (!target) {
        console.error("Page not found:", pageId);
        return;
    }

    document.querySelectorAll(".page").forEach(function(page) {
        page.classList.remove("active");
        page.setAttribute("aria-hidden", "true");
    });

    target.classList.add("active");
    target.setAttribute("aria-hidden", "false");
    target.scrollTop = 0;

    if (pageId === "you-again" && bgMusic) {
        bgMusic.volume = MAX_VOLUME;

        if (volumeIncreaseTimer) {
            clearInterval(volumeIncreaseTimer);
            volumeIncreaseTimer = null;
        }
    }
}

function shriChoice(answer) {
    if (answer === "yes") {
        setPandaImage("panda-intro", pandaWaving);
        goTo("panda-intro");
    } else {
        setPandaImage("not-shri", pandaResting);
        goTo("not-shri");
    }
}

function friendChoice(answer) {
    if (answer === "yes") {
        goTo("friends");
        return;
    }

    pleaseCount++;

    const sadMessage = document.getElementById("sad-message");

    if (sadMessage) {
        const pleaseWords = Array(pleaseCount)
            .fill("Please")
            .join(" ");

        sadMessage.textContent = `${pleaseWords} choose again 😭`;
    }

    setPandaImage("sad", pandaCrying);
    goTo("sad");
}

function bossChoice(answer) {
    if (answer === "yes") {
        setPandaImage("boss-question", pandaDetective);
        goTo("boss-question");
    } else {
        setPandaImage("already-boss", pandaTeasing);
        goTo("already-boss");
    }
}

function alreadyBossChoice(answer) {
    if (answer === "yes") {
        goTo("boss-question");
    }
}

addPandaImages();

const bgMusic = document.getElementById("bgMusic");

if (bgMusic) {
    bgMusic.volume = START_VOLUME;

    function startMusic() {
        if (!musicStarted) {
            bgMusic.play()
                .then(function() {
                    musicStarted = true;
                    startGradualVolumeIncrease();
                })
                .catch(function() {
                    // Try again on the next user interaction if playback is blocked.
                });
        }
    }

    document.addEventListener("pointerdown", startMusic);
}
