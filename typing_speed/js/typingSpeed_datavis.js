var DataViz = function() {
  'use strict';

  var barX = 80,
    barHeight = 15,
    textX = 10;

  var svg = d3.select('svg');

  function updateBar(options) {
    d3.select(options.class)
      .transition()
      .attr('width', options.data * 4);

    d3.select(options.class + '-label')
      .text(options.label + ' (' + options.data + '):');
  }


  function update(data) {

    var allWordsOptions = {
      class: '.all-words',
      data: data.wordCount,
      label: 'total'
    };

    var correctWordsOptions = {
      class: '.correct-words',
      data: data.correctWordCount,
      label: 'correct'
    };

    var wrongWordsOptions = {
      class: '.wrong-words',
      data: data.wrongWordCount,
      label: 'wrong'
    };

    var wpmOptions = {
      class: '.wpm',
      data: data.wpm,
      label: 'wpm'
    };

    updateBar(allWordsOptions);
    updateBar(correctWordsOptions);
    updateBar(wrongWordsOptions);
    updateBar(wpmOptions);

  }

  function createBar(options) {
    svg.append('rect')
      .attr({
        class: options.bar.class,
        x: options.bar.x,
        y: options.bar.y,
        height: options.bar.height,
        fill: options.bar.fill
      });

    svg.append('text')
      .attr({
        class: options.bar.class + '-label',
        x: options.label.x,
        y: options.label.y
      })
      .style('font-size', options.label.fontSize)
      .text(options.label.text + ' (0):');
  }


  function setup() {

    var allWordsOptions = {
      bar: {
        x: barX,
        y: 10,
        height: barHeight,
        fill: 'lightgrey',
        class: 'all-words'
      },
      label: {
        x: textX,
        y: 20,
        fontSize: '12px',
        text: 'total'
      }
    };

    var correctWordsOptions = {
      bar: {
        x: barX,
        y: 30,
        height: barHeight,
        fill: 'green',
        class: 'correct-words'
      },
      label: {
        x: textX,
        y: 40,
        fontSize: '12px',
        text: 'correct'
      }
    };

    var wrongWordsOptions = {
      bar: {
        x: barX,
        y: 50,
        height: barHeight,
        fill: 'red',
        class: 'wrong-words'
      },
      label: {
        x: textX,
        y: 60,
        fontSize: '12px',
        text: 'wrong'
      }
    };

    var wpmOptions = {
      bar: {
        x: barX,
        y: 70,
        height: barHeight,
        fill: 'blue',
        class: 'wpm'
      },
      label: {
        x: textX,
        y: 80,
        fontSize: '12px',
        text: 'wpm'
      }
    };

    createBar(allWordsOptions);
    createBar(correctWordsOptions);
    createBar(wrongWordsOptions);
    createBar(wpmOptions);
  }

  return {
    setup: setup,
    update: update
  };


};
