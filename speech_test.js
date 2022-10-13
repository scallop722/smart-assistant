const VoiceText = require('voicetext');
const fs = require('fs');
const player = require("./WavPlayer");

const voice = new VoiceText('vg5xe2hrcn87c9kw');
const text = '今日の時間割は国語、算数、理科、社会です。';

voice
  .speaker(voice.SPEAKER.HIKARI)
  .speak(text, (e, buf) => {
    fs.writeFile('./test.wav', buf, 'binary', (e) => {})
  });
player.play("./test.wav");