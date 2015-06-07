var TypingSpeed =(function() {
  'use strict';
  var times = [];
  var wordCount = 0;
  var correctWordCount = 0;
  var wrongWordCount = 0;
  var totalTime = 0;
  var allWPM = 0;
  var correctWPM = 0;
  var textArr = [];
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

  function captureKeypress(e) {
    if(times.length === 0){
      times.push(Date.now());
    }

    if (e.keyCode === spaceCode && prevCode === e.keyCode) {
      return;
    }
    prevCode = e.keyCode;

    if (e.keyCode === spaceCode) {

      wordCount += 1;



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
    return String.fromCharCode(code).toLowerCase();
  }

  function verifyWord() {
    // console.log('correct current:-', currentWord === textArr[wordCount - 1], textArr[wordCount - 1], '-', currentWord, '-', wordCount);

    return currentWord === textArr[wordCount - 1];
  }

  function createWordsArr(text) {
    textArr = text.toLowerCase().split(' ');
  }

  return {
    createWordsArr: createWordsArr,
    times: times,
    getWordCount: getWordCount,
    wordPerMinute: wordPerMinute,
    getCorrectWordCount: getCorrectWordCount,
    getWrongWordCount: getWrongWordCount,
    calculateTotalTime: calculateTotalTime,
    captureKeypress: captureKeypress,
    getWPM: getWPM
  };


})();