document.onload = (function(dataViz, TypingSpeed) {
  'use strict';

  console.log('init.js loaded');

  // ======== initialize  stuff ========

  var wordCount = 0,
    totalTime = 0,
    ts = TypingSpeed,
    timeobj,
    text,
    interval = 2000,
    textEl,
    typingSpeedOptions = {};

  document.addEventListener('keydown', ts.captureInputText);

  text =
    "Sir Walter Elliot, of Kellynch Hall, in Somersetshire, was a man who, for his own amusement, never took up any book but the Baronetage; there he found occupation for an idle hour, and consolation in a distressed one; there his faculties were roused into admiration and respect, by contemplating the limited remnant of the earliest patents; there any unwelcome sensations, arising from domestic affairs changed naturally into pity and contempt as he turned over the almost endless creations of the last century; and there, if every other leaf were powerless, he could read his own history with an interest which never failed.";


  function renderText(string) {
    textEl.innerText = string;
  }

  function updateViz() {
    var data;

    wordCount = ts.getWordCount();
    totalTime = Date.now() - ts.times[0];
    data = {
      wordCount: wordCount,
      totalTime: totalTime,
      wpm: Math.round(ts.wordPerMinute(wordCount, totalTime)) || 0,
      correctWordCount: ts.getCorrectWordCount(),
      wrongWordCount: ts.getWrongWordCount()
    };

    dataViz.updateViz(data);
  }

  // ======== start doing stuff ========

  dataViz.init();

  typingSpeedOptions = {
    text: text,
    textEl: document.querySelector('.text-body'),
    inputEl: document.querySelector('.textInput')
  };

  ts.init(typingSpeedOptions);

  var intervalID = setInterval(updateViz, 500);

})(dataViz, TypingSpeed);
