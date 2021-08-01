var synth = window.speechSynthesis;
// 参数
const voice = "Google 普通话（中国大陆）";
const pitch = 1;
const rate = 1;
const voices = synth.getVoices();

function setVoice(utterThis) {
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === voice) {
      utterThis.voice = voices[i];
      break;
    }
  }
}

export function textToSpeech(text) {
  return new Promise((resolve, reject) => {
    if (text !== "") {
      var utterThis = new SpeechSynthesisUtterance(text);
      utterThis.onend = function (event) {
        console.log("SpeechSynthesisUtterance.onend");
        resolve();
      };
      utterThis.onerror = function (event) {
        // console.error("SpeechSynthesisUtterance.onerror");
        reject("SpeechSynthesisUtterance.onerror");
      };
      setVoice(utterThis);
      utterThis.pitch = pitch;
      utterThis.rate = rate;
      synth.speak(utterThis);
    }
  });
}
