import './speechrecognition.js'

// Ajout du contenu initial au conteneur #app
document.querySelector('#app').innerHTML = `
  <div>
    <h1>Speech Recognition</h1>
    <div id="timer">00:00:00</div>
    <button id="toggleButton">Start</button>
    <div id="output"></div>
  </div>
`;

// Exécution après que le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');

    // Vérifie si le bouton est trouvé avant d'ajouter un écouteur d'événements
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleListening);
    } else {
        console.error('Bouton avec l\'ID "toggleButton" introuvable.');
    }
});