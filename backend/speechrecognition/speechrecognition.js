let recognition;
let transcript = "";
let isListening = false;
let startTime;
let timerInterval;

function initializeSpeechRecognition() {
    // Vérifie si l'API de reconnaissance vocale est supportée
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        console.error("La reconnaissance vocale n'est pas prise en charge par ce navigateur.");
        return;
    }

    // Initialisation de l'API
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new window.SpeechRecognition();

    // Configuration
    recognition.interimResults = true; // Résultats intermédiaires
    recognition.continuous = true;    // Écoute continue

    // Gestion des résultats
    recognition.addEventListener('result', (e) => {
        // Vérifie si e.results contient des résultats
        if (e.results && e.results.length > 0) {
            // Extraire le transcript des résultats
            transcript = Array.from(e.results)
                .map(result => result[0])  // Récupérer le premier élément du tableau (meilleur résultat)
                .map(result => result.transcript) // Récupérer la transcription
                .join('');  // Joindre toutes les transcriptions en une seule chaîne

            // Mise à jour de l'élément HTML avec l'ID "output"
            const outputElement = document.getElementById('output');
            if (outputElement) {
                outputElement.textContent = transcript;
            } else {
                console.warn('Élément avec l\'ID "output" introuvable.');
            }
        } else {
            console.error("Aucun résultat trouvé dans l'événement de reconnaissance vocale.");
        }
    });

    // Relance la reconnaissance si elle se termine automatiquement
    recognition.addEventListener('end', () => {
        if (isListening) {
            recognition.start();
        }
    });

    // Gestion des erreurs
    recognition.addEventListener('error', (e) => {
        console.error("Erreur lors de la reconnaissance vocale :", e.error);
    });

    console.log("Reconnaissance vocale initialisée.");
}

function toggleListening() {
    // Si recognition n'est pas initialisé, on initialise
    if (!recognition) {
        initializeSpeechRecognition();
    }

    // Basculer l'état d'écoute
    if (isListening) {
        stopListening();
    } else {
        startListening();
    }
}

function startListening() {
    // Activer l'état d'écoute
    isListening = true;

    // Démarrer la reconnaissance vocale
    recognition.start();

    // Enregistrer le moment où l'écoute commence
    startTime = Date.now();

    // Mettre à jour le timer immédiatement
    updateTimer();

    // Mettre à jour le timer toutes les millisecondes
    timerInterval = setInterval(updateTimer, 10);

    // Mettre à jour le texte du bouton
    const toggleButton = document.getElementById('toggleButton');
    if (toggleButton) {
        toggleButton.textContent = 'Stop';
    } else {
        console.warn("Le bouton avec l'ID 'toggleButton' est introuvable.");
    }
}

function stopListening() {
    // Désactiver l'état d'écoute
    isListening = false;

    // Arrêter la reconnaissance vocale
    if (recognition) {
        recognition.stop();
    } else {
        console.warn("La reconnaissance vocale n'est pas initialisée.");
    }

    // Arrêter le timer si actif
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null; // Réinitialisation de l'identifiant pour éviter des conflits
    } else {
        console.warn("Aucun intervalle actif à arrêter.");
    }

    // Mettre à jour le texte du bouton
    const toggleButton = document.getElementById('toggleButton');
    if (toggleButton) {
        toggleButton.textContent = 'Start';
    } else {
        console.warn("Le bouton avec l'ID 'toggleButton' est introuvable.");
    }
}

function updateTimer() {
    // Calculer le temps écoulé
    const elapsedTime = Date.now() - startTime;

    // Vérifier si la fonction formatTime existe
    if (typeof formatTime !== 'function') {
        console.error("La fonction 'formatTime' est introuvable. Assurez-vous qu'elle est définie.");
        return;
    }

    // Formater le temps écoulé
    const formattedTime = formatTime(elapsedTime);

    // Mettre à jour l'élément HTML avec l'ID 'timer'
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = formattedTime;
    } else {
        console.warn("L'élément avec l'ID 'timer' est introuvable.");
    }
}

function formatTime(ms) {
    const date = new Date(ms);
    return date.toISOString().substr(11,8);
}