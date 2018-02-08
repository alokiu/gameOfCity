// Test browser support
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

if (window.SpeechRecognition === null) {
    document.getElementById('ws-unsupported').classList.remove('hidden');
    document.getElementById('button-play-ws').setAttribute('disabled', 'disabled');
    document.getElementById('button-stop-ws').setAttribute('disabled', 'disabled');
} else {
    var recognizer = new window.SpeechRecognition();
    var transcription = document.getElementById('transcription');
    var log = document.getElementById('log');
    var input = document.getElementById('inputCity');

    // Recogniser doesn't stop listening even if the user pauses
    recognizer.continuous = true;

    // Start recognising
    recognizer.onresult = function (event) {
        transcription.textContent = '';

        for (var i = event.resultIndex; i < event.results.length; i++) {
            transcription.textContent += event.results[i][0].transcript;
        }
        input.value = transcription.textContent[0].toUpperCase() + transcription.textContent.slice(1);
    };
    document.getElementById('button-play-ws').addEventListener('click', function () {
        recognizer.start();

    });

    document.getElementById('button-stop-ws').addEventListener('click', function () {
        recognizer.stop();
    });

    document.getElementById('clear-all').addEventListener('click', function () {
        input.value = '';
    });

}