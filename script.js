let moveCount = 0;
function moveButton() {
    let btnNo = document.getElementById('no');
    let btnYes = document.getElementById('yes');

    if (moveCount < 10) { // Limite à 10 déplacements avant de sortir de l'écran
        let x = Math.random() * (window.innerWidth - btnNo.clientWidth) - (window.innerWidth / 2);
        let y = Math.random() * (window.innerHeight - btnNo.clientHeight) - (window.innerHeight / 2);
        btnNo.style.transform = `translate(${x}px, ${y}px)`;
        moveCount++;
    } else {
        btnNo.style.transition = "transform 1s ease-in-out";
        btnNo.style.transform = `translate(200vw, 0)`; // Fait disparaître le bouton en dehors de la page
    }

    btnYes.style.transform = "scale(1.5)";
    setTimeout(() => {
        btnYes.style.transform = "scale(1)";
    }, 1000);
}
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".container").style.display = "none"; // Masquer le contenu au départ
});

function checkPassword() {
    let password = document.getElementById("password-input").value;

    if (password === "26/07") { // Remplace par ton vrai mot de passe
        document.getElementById("login-screen").style.display = "none"; // Cache l'écran de connexion
        document.querySelector(".container").style.display = "block"; // Affiche le contenu principal
    } else {
        document.getElementById("error-box").style.display = "block"; // Affiche la boîte d'erreur
    }
}

// Fonction pour fermer la boîte d'erreur
function closeError() {
    document.getElementById("error-box").style.display = "none"; // Cache la boîte d'erreur
}

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️"; // Emoji cœur
    document.getElementById("hearts-container").appendChild(heart);

    // Position aléatoire sur la largeur de l'écran
    let posX = Math.random() * window.innerWidth;
    heart.style.left = `${posX}px`;

    // Forcer tous les cœurs à commencer en bas
    heart.style.position = "absolute";
    heart.style.bottom = "0px";

    // Taille aléatoire
    let size = Math.random() *60 + 20; // Entre 10px et 40px
    heart.style.fontSize = `${size}px`;

    // Durée d'animation aléatoire
    let duration = Math.random() * 3 + 3; // Entre 3 et 6 secondes

    // Appliquer l'animation immédiatement
    heart.style.animation = `floatUp ${duration}s linear forwards`;

    // Supprimer le cœur après son animation
    heart.addEventListener("animationend", () => {
        if (heart.parentNode) {
            heart.remove();
        }
    });

    // Supprimer le cœur immédiatement après un clic (explosion)
    heart.onclick = () => {
        explodeHeart(heart);
        heart.remove(); // Supprime immédiatement le cœur après explosion
    };

    // Sécurité : Supprimer après 7 secondes si l'animation échoue
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 7000);
}




// Fonction pour faire exploser un cœur
function explodeHeart(heart) {
    const rect = heart.getBoundingClientRect(); // Récupère la position exacte du cœur cliqué
    heart.style.animation = "explode 0.5s ease-out";

    setTimeout(() => {
        heart.remove();
    }, 500);

    // Générer plusieurs petits cœurs autour du point cliqué
    for (let i = 0; i < 6; i++) {
        const miniHeart = document.createElement("div");
        miniHeart.innerHTML = "❤️";
        miniHeart.classList.add("heart");
        document.getElementById("hearts-container").appendChild(miniHeart);

        // Déplacement aléatoire autour du cœur cliqué
        let offsetX = (Math.random() - 0.5) * 100; // Horizontal
        let offsetY = (Math.random() - 0.5) * 100; // Vertical

        miniHeart.style.position = "fixed"; // Important : position fixe pour respecter l'écran
        miniHeart.style.left = `${rect.left + offsetX}px`;
        miniHeart.style.top = `${rect.top + offsetY}px`;
        miniHeart.style.fontSize = `${Math.random() * 10 + 5}px`; // Taille plus petite
        miniHeart.style.opacity = "1";
        miniHeart.style.animation = "explode 0.5s ease-out";

        setTimeout(() => {
            miniHeart.remove();
        }, 500);
    }
}

// Générer des cœurs toutes les 500ms
// Générer des cœurs toutes les 500ms
setInterval(createHeart, 500);

// Sélection des boutons
let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let yesSize = 1; // Taille initiale du bouton "Oui"

// 🛑 --- FONCTION : Effet du bouton "Oui" qui grandit à chaque passage sur "Non" --- 🛑
noButton.addEventListener("mouseover", function() {
    yesSize += 0.2; // Augmente la taille de 20% à chaque passage
    yesButton.style.transform = `scale(${yesSize})`;
    yesButton.style.transition = "transform 0.2s ease-in-out"; // Animation fluide
});

// 🛑 --- FONCTION : Réduction si le bouton devient trop grand (optionnel) --- 🛑
noButton.addEventListener("mouseout", function() {
    if (yesSize > 2) { // Si la taille dépasse 2x, on la remet à 1
        yesSize = 1;
        yesButton.style.transform = "scale(1)";
    }
});

// 🛑 --- FONCTION : Afficher la boîte de dialogue au clic sur "Oui" --- 🛑
yesButton.addEventListener("click", function() {
    document.getElementById("love-dialog").style.display = "block"; // Affiche la boîte
    createExplosions(); // Active les explosions GIF
});

// 🛑 --- FONCTION : Fermer la boîte de dialogue --- 🛑
function closeDialog() {
    document.getElementById("love-dialog").style.display = "none";
}

// 🛑 --- FONCTION : Explosion de cœurs au clic --- 🛑
function explodeHeart(heart) {
    const rect = heart.getBoundingClientRect(); // Récupère la position exacte

    // Ajouter la classe d'explosion au cœur principal cliqué
    heart.classList.add("explode");

    // Supprimer le cœur principal après l'animation
    heart.addEventListener("animationend", () => {
        heart.remove();
    });

    for (let i = 0; i < 6; i++) { // Crée 6 petits cœurs autour
        const miniHeart = document.createElement("div");
        miniHeart.innerHTML = "❤️";
        miniHeart.classList.add("heart", "explode"); // Ajoute aussi la classe d'explosion
        document.getElementById("hearts-container").appendChild(miniHeart);

        let offsetX = (Math.random() - 0.5) * 100; // Déplacement aléatoire
        let offsetY = (Math.random() - 0.5) * 100;

        miniHeart.style.position = "fixed";
        miniHeart.style.left = `${rect.left + offsetX}px`;
        miniHeart.style.top = `${rect.top + offsetY}px`;
        miniHeart.style.fontSize = `${Math.random() * 10 + 5}px`;

        // Supprimer chaque petit cœur après son animation
        miniHeart.addEventListener("animationend", () => {
            miniHeart.remove();
        });
    }
}



// 🛑 --- FONCTION : Créer des explosions de GIFs au clic sur "Oui" --- 🛑
function createExplosions() {
    let explosionContainer = document.getElementById("gif-explosion");

    for (let i = 0; i < 10; i++) { // Crée 10 explosions
        let explosion = document.createElement("img");
        explosion.src = "https://media.tenor.com/8HBfCw0Oh3gAAAAi/waterfall-heart.gif"; // GIF de cœur
        explosion.classList.add("explosion-gif");

        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        
        explosion.style.left = `${x}px`;
        explosion.style.top = `${y}px`;

        explosionContainer.appendChild(explosion);

        // Supprimer le GIF après une durée plus longue
        setTimeout(() => {
            explosion.remove();
        }, 4000); // Augmenté à 4 secondes pour une meilleure visibilité
    }
}

document.getElementById("yes").addEventListener("click", function() {
    document.getElementById("gift-button").style.display = "block";
});
