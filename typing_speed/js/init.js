document.onload = (function(dataViz, TypingSpeed) {
  "use strict";

  console.log("init.js loaded");

  // ======== initialize  stuff ========

  var wordCount = 0,
    totalTime = 0,
    ts = TypingSpeed,
    intervalID,
    text,
    interval = 500,
    typingSpeedOptions = {},
    stopButtonEl,
    resetButtonEl,
    inputEl = document.querySelector(".textInput");

  document.addEventListener("keyup", function() {
    ts.captureInputText(inputEl.value)
  });

  stopButtonEl = document.querySelector(".stop-button");
  stopButtonEl.addEventListener("click", function() {
    ts.stopTest(intervalID);
  });

  resetButtonEl = document.querySelector(".reset-button");
  resetButtonEl.addEventListener("click", reset);


  text = "Sir Walter Elliot, of Kellynch Hall, in Somersetshire, was a man who, for his own amusement, never took up any book but the Baronetage; there he found occupation for an idle hour, and consolation in a distressed one; there his faculties were roused into admiration and respect, by contemplating the limited remnant of the earliest patents; there any unwelcome sensations, arising from domestic affairs changed naturally into pity and contempt as he turned over the almost endless creations of the last century; and there, if every other leaf were powerless, he could read his own history with an interest which never failed.";

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

  function reset() {
    ts.reset(text);
    intervalID = setInterval(updateViz, interval);
  }

  // ======== start doing stuff ========

  dataViz.init();

  typingSpeedOptions = {
    text: text,
    textEl: document.querySelector(".text-body"),
    inputEl: document.querySelector(".textInput")
  };

  ts.init(typingSpeedOptions);

  intervalID = setInterval(updateViz, interval);

  // ts.stopTimer(intervalID)

})(dataViz, TypingSpeed);
