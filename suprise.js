/* 💖 Génération des cœurs flottants */
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    document.getElementById("hearts-container").appendChild(heart);

    let posX = Math.random() * window.innerWidth;
    heart.style.left = `${posX}px`;
    heart.style.fontSize = `${Math.random() * 20 + 10}px`;

    let duration = Math.random() * 3 + 2;
    heart.style.animationDuration = `${duration}s`;

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

setInterval(createHeart, 500);



function revealMessage() {
    document.getElementById("hidden-message").classList.add("visible");
    document.getElementById("reveal-button").style.display = "none";

    // Afficher la vidéo après un petit délai
    setTimeout(() => {
        document.getElementById("video-container").classList.add("visible");
    }, 1000);
}

function revealMessage() {
    document.getElementById("hidden-message").classList.add("visible");
    document.getElementById("reveal-button").style.display = "none"; // Cacher le bouton après clic

    // Empêcher l'interaction avec la vidéo avant l'affichage
    let videoContainer = document.getElementById("video-container");
    videoContainer.style.pointerEvents = "none";

    // Afficher la vidéo après un petit délai
    setTimeout(() => {
        videoContainer.classList.add("visible");
        videoContainer.style.pointerEvents = "auto"; // Réactiver l'interaction après l'apparition

        // Lancer la vidéo automatiquement
        let video = document.getElementById("couple-video");
        video.play();
    }, 1000);
}

function createFloatingHearts() {
    const videoContainer = document.getElementById("video-container");

    for (let i = 0; i < 10; i++) { // Crée 10 cœurs aléatoires
        let heart = document.createElement("div");
        heart.classList.add("floating-heart");

        let randomX = Math.random() * videoContainer.offsetWidth - 20;
        let randomY = Math.random() * videoContainer.offsetHeight - 20;
        
        heart.style.left = `${randomX}px`;
        heart.style.top = `${randomY}px`;
        heart.style.position = "absolute";

        videoContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
}

// Ajouter les cœurs après le clic
document.getElementById("reveal-button").addEventListener("click", () => {
    setTimeout(createFloatingHearts, 1500);
});


