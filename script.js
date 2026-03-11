// Sample Brainrot Phrases
const samples = [
    "bro that skibidi toilet video was lowkey fire no cap, the sigma grindset is real fr fr",
    "gyatt that ohio rizz party was bussin ong, we were vibing and taking Ls all night",
    "this mewing tutorial hit different, got that fanum tax energy ngl",
    "im deadass the main character rn, slay queen energy only, mid takes are not allowed",
    "the alpha male just got ratio'd by a beta, W for the underdogs fr"
];

// DOM Elements
const inputText = document.getElementById('inputText');
const randomBtn = document.getElementById('randomBtn');
const charCount = document.getElementById('charCount');
const translateBtn = document.getElementById('translateBtn');
const errorMsg = document.getElementById('errorMsg');
const outputText = document.getElementById('outputText');
const copyBtn = document.getElementById('copyBtn');

// Random Example Handler
randomBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * samples.length);
    inputText.value = samples[randomIndex];
    updateCharCount();
});

// Character Counter
const updateCharCount = () => {
    charCount.textContent = `${inputText.value.length} / 1000`;
};
inputText.addEventListener('input', updateCharCount);

// Translate Logic
translateBtn.addEventListener('click', async () => {
    const text = inputText.value.trim();
    if (!text) {
        showError("Please enter some brainrot vernacular first.");
        return;
    }

    // Set Loading State
    translateBtn.disabled = true;
    translateBtn.textContent = "Formalizing...";
    errorMsg.classList.add('hidden');
    outputText.textContent = "Please wait, the distinguished professor is writing...";
    copyBtn.classList.add('hidden');

    try {
        // Send request to our secure Vercel backend
        const response = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "A most unfortunate error occurred.");
        }

        // Display Success
        outputText.textContent = data.translation;
        copyBtn.classList.remove('hidden');

    } catch (err) {
        showError(err.message);
        outputText.textContent = "Translation failed.";
    } finally {
        // Reset Loading State
        translateBtn.disabled = false;
        translateBtn.textContent = "Translate to Formal English";
    }
});

// Copy to Clipboard
copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(outputText.textContent);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    } catch (err) {
        showError("Failed to copy text.");
    }
});

// Helper for Error Messages
function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.classList.remove('hidden');
}