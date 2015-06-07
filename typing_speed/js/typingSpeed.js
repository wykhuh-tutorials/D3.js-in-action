var TypingSpeed =(function() {
  'use strict';

  console.log('TypingSpeed.js loaded');

  var times = [];
  var wordCount = 0;
  var correctWordCount = 0;
  var wrongWordCount = 0;
  var totalTime = 0;
  var allWPM = 0;
  var correctWPM = 0;
  var textArr = [];
  var textArrHighlight = [];
  var textEl;
  var currentWord;
  var currentLetter;
  var prevCode;
  var minutes = 0;
  var spaceCode = ' '.charCodeAt();
  var randomKeys = {
    13: 'return',
    16: 'shift',
    8: 'delete',
    9: 'tab',
    20: 'caps'
  };

  wrongWordCount = wordCount - correctWordCount;

  function captureInputText(e) {
    console.log(e.keyCode);

    if(times.length === 0){
      times.push(Date.now());
    }

    if (e.keyCode === spaceCode && prevCode === e.keyCode) {
      return;
    }
    prevCode = e.keyCode;

    if (e.keyCode === spaceCode) {

      wordCount += 1;
      highlightWord(wordCount);
      renderText(textArrHighlight);


      if (verifyWord(currentWord)) {

        correctWordCount += 1;
      }
      currentWord = '';

      times.push(Date.now());

      if (wordCount > 1) {

        totalTime = calculateTotalTime(times);
        minutes = calculateMinutes(totalTime);
        allWPM = wordPerMinute(wordCount, minutes);
        correctWPM = wordPerMinute(correctWordCount, minutes);
      }
    } else if (randomKeys[e.keyCode]) {
      return;
    } else {
      currentLetter = convertCodeToLetter(e.keyCode);
      currentWord = captureCurrentWord(currentLetter);
    }
  }

  function getWordCount(){
    return wordCount;
  }

  function getCorrectWordCount(){
    return correctWordCount;
  }

  function getWrongWordCount(){
    return wordCount - correctWordCount;
  }

  function getTotalTime(){
    return Date.now() - times[0];
  }

  function getWPM(){
    return correctWPM;
  }

  function calculateTotalTime(times) {
    return Date.now() - times[0];
  }

  function calculateMinutes(totalTime) {
    return totalTime / (1000 * 60);
  }

  function wordPerMinute(count, usecs) {
    var minutes = usecs / (1000 * 60);
    return count / minutes;
  }

  function captureCurrentWord(currentLetter) {
    return (currentWord || '') + currentLetter;
  }

  function convertCodeToLetter(code) {
    return String.fromCharCode(code);
  }

  function verifyWord() {
    // keydown always returns keyCode for uppercase letters, so need toLowerCase
    console.log(currentWord.toLowerCase(), textArr[wordCount - 1].toLowerCase())
    return currentWord.toLowerCase() === textArr[wordCount - 1].toLowerCase();
  }

  function createWordsArr(text) {
    // textArr is used for comparsion, hightlightTextArr is used for html html
    textArr = text.split(' ');
    textArrHighlight = text.split(' ');
  }

  function unhighlightWord(index){
    var cleanWord = textArrHighlight[index].match(/<span.*?>(.*?)<\/span>/);
    textArrHighlight[index] =   cleanWord[1];
  }

  function highlightWord(index) {
    if(index >= 1){
      unhighlightWord(index-1);
    }
    textArrHighlight[index] = '<span class="highlight">' + textArrHighlight[index] + '</span>';
  }

  function renderText(textArr) {
    textEl.innerHTML =  textArr.join(' ');
  }

  function stopTimer(intervalID) {
    clearInterval(intervalID);
  }

  function setTextEl(el){
     textEl = el;
  }

  function init(options) {
    setTextEl(options.textEl);
    createWordsArr(options.text);
    highlightWord(0);
    renderText(textArrHighlight);
  }


  return {
    createWordsArr: createWordsArr,
    times: times,
    getWordCount: getWordCount,
    wordPerMinute: wordPerMinute,
    getCorrectWordCount: getCorrectWordCount,
    getWrongWordCount: getWrongWordCount,
    captureInputText: captureInputText,
    stopTimer: stopTimer,
    init: init
  };


})();
