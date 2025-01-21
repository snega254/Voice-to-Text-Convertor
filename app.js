const startBtn = document.getElementById("startBtn");
const resultDiv = document.getElementById("result");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";  // Set language to English
    recognition.continuous = false;  // Stop after one sentence
    recognition.interimResults = false;  // Show final results only

    recognition.onstart = () => {
        startBtn.disabled = true;
        resultDiv.innerHTML = "Listening...";
    };

    recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        resultDiv.innerHTML = `You said: <strong>${speechToText}</strong>`;
        startBtn.disabled = false;
    };

    recognition.onerror = (event) => {
        resultDiv.innerHTML = "Error occurred: " + event.error;
        startBtn.disabled = false;
    };

    recognition.onend = () => {
        startBtn.disabled = false;
    };

    startBtn.addEventListener("click", () => {
        recognition.start();
    });
} else {
    resultDiv.innerHTML = "Speech recognition is not supported in this browser.";
}
