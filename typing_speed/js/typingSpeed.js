var TypingSpeed = (function() {
  "use strict";

  console.log("TypingSpeed.js loaded");

  var times = [],
    wordCount = 0,
    correctWordCount = 0,
    textArr = [],
    textArrHighlight = [],
    textEl,
    inputEl,
    currentWord,
    currentChar,
    inputText,
    prevInputLength = 0;

  function getWordCount() {
    return wordCount;
  }

  function getCorrectWordCount() {
    return correctWordCount;
  }

  function getWrongWordCount() {
    return wordCount - correctWordCount;
  }

  function wordPerMinute(count, usecs) {
    var minutes = usecs / (1000 * 60);
    return count / minutes;
  }

  function verifyWord() {
    // console.log("verifyWord", currentWord === textArr[wordCount - 1],
      // currentWord, textArr[wordCount - 1]);

    var res = currentWord === textArr[wordCount - 1];
    currentWord = undefined;
    return res;
  }

  function createWordsArr(text) {
    // textArr is used for comparsion, hightlightTextArr is used for html html
    textArr = text.split(" ");
    textArrHighlight = text.split(" ");
  }

  function unhighlightWord(index) {
    var cleanWord = textArrHighlight[index].match(/<span.*?>(.*?)<\/span>/);
    textArrHighlight[index] = cleanWord[1];
  }

  function highlightWord(index) {
    if (index >= 1) {
      unhighlightWord(index - 1);
    }
    textArrHighlight[index] = '<span class="highlight">' + textArrHighlight[index] + "</span>";
  }

  function renderText(arr) {
    textEl.innerHTML = arr.join(" ");
  }

  function stopTest(intervalID) {
    clearInterval(intervalID);
  }


  function getLastWord() {
    var words = inputText.split(" ");
    // console.log('getLastWord', words[words.length - 1]);
    return words[words.length - 1];
  }

  function captureInputText(input) {
    // console.log(input)

    currentChar = input.slice(-1);
    inputText = input;

    if (!times.length) {
      times.push(Date.now());
    }

    // ignores key presses that don't add any characters
    if (prevInputLength === inputText.length || currentChar === "\n") {
      return;
    }

    // igornes spaces that occur because we deleted existing characters
    // 'abc cd' -> 'abc '
    if (currentChar === " " && (prevInputLength < inputText.length)) {
      prevInputLength = inputText.length;
      wordCount += 1;

      highlightWord(wordCount);
      renderText(textArrHighlight);

      if (verifyWord(currentWord)) {
        correctWordCount += 1;
      }

      times.push(Date.now());

    } else {
      prevInputLength = inputText.length;
      currentWord = getLastWord();
    }
  }


  function init(options) {
    textEl = options.textEl;
    inputEl = options.inputEl;
    createWordsArr(options.text);
    highlightWord(0);
    renderText(textArrHighlight);
  }


  function reset(text) {
    times = [];
    wordCount = 0;
    correctWordCount = 0;
    createWordsArr(text);
    currentWord = undefined;
    currentChar = undefined;
    inputText = undefined;
    prevInputLength = 0;
    highlightWord(0);
    renderText(textArrHighlight);
    inputEl.value = "";
  }

  return {
    captureInputText: captureInputText,
    getWordCount: getWordCount,
    times: times,
    getCorrectWordCount: getCorrectWordCount,
    getWrongWordCount: getWrongWordCount,
    wordPerMinute: wordPerMinute,
    init: init,
    stopTest: stopTest,
    reset: reset
  };

})();
