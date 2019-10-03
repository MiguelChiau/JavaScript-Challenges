// To initialize the speech API
const synth = window.speechSynthesis;
//To get the Dom elements
const textForm = document.querySelector("form");
const testInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");

// To initialize the array of voices
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();
  console.log(voices);

  //looping through the array of voices and create an option element
  voices.forEach(voice => {
    const option = document.createElement("option");
    //then fill option with the languages and voices
    option.textContent = voice.name + "(" + voice.lang + ")";

    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);

    voiceSelect.appendChild(option);
  });
};
getVoices();
//This is an async event
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// The Speach
const speak = () => {
  if (synth.speaking) {
    console.error("Already speaking ...");
    return;
  }
  //Check if the text input submitted is not empty
  if (testInput.value !== " ") {
    const speakTest = new SpeechSynthesisUtterance(testInput.value);

    // The end of the speech
    speakTest.onend = e => {
      console.log("Done speaking...");
    };

    //In case of speak error
    speakTest.onerror = e => {
      console.error("There was an issue");
    };

    //  Now to grab the voice that user selects
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );

    //Looping through voices
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakTest.voice = voice;
      }
    });

    //To set the pitch and rate
    speakTest.rate = rate.value;
    speakTest.pitch = pitch.value;
    //Then to actualy speak
    synth.speak(speakTest);
  }
};

//The event listeners
textForm.addEventListener("submit", e => {
  e.preventDefault();
  speak();
  testInput.blur();
});

//The changes in  rate and pitch values
rate.addEventListener("change", e => (rateValue.textContent = rate.value));
pitch.addEventListener("change", e => (pitchValue.textContent = pitch.value));

//Change in voice selected
voiceSelect.addEventListener("change", e => speak());
