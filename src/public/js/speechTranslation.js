let recognition;
let socket;

function startRecording() {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    socket = io();

    recognition.onresult = function (event) {
        const result = event.results[event.results.length - 1];
        const transcript = result[0].transcript;

        // Update the UI with live transcription
        document.getElementById('transcription').innerText = transcript;

        // Send audio data to the server via WebSocket
        socket.emit('audio', result[0].blob);
    };

    recognition.onend = function () {
        // Handle end of speech recognition, if needed
    };

    recognition.start();
};

function stopRecording() {
    if (recognition) {
        recognition.stop();
        socket.disconnect();
    }
};