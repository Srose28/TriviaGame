
var trivia = $("#answer");
var timer;


var questions = [
  {
    question: "What year did the original Lion King come out?",
    answers: ["1994","1996"],
    correctAnswer: "1994"
  },
  {
    question: "How many championship rings do Lebron James have",
    answers: ["none ","three"],
    correctAnswer: "three"
  },
  {
    question: "Who was the 22nd president of the United States?",
    answers: ["Abraham Lincoln", "Grover Cleveland"],
    correctAnswer: "Grover Cleveland"
  },
];



var game = {
  correct: 0,
  incorrect: 0,
  counter: 120,

  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.done();
    }
  },

  start: function() {
    timer = setInterval(game.countdown, 1000);

    $("#question").prepend(
      "<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>"
    );

    $("#start").remove();

    for (var i = 0; i < questions.length; i++) {
      trivia.append("<h2>" + questions[i].question + "</h2>");
      for (var j = 0; j < questions[i].answers.length; j++) {
        trivia.append("<input type='radio' name='question-" + i +
          "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
      }
    }

    trivia.append("<button id='done'>Finished</button>");
  },

  done: function() {
    var inputs = trivia.children("input:checked");
    for (var i = 0; i < inputs.length; i++) {
      if ($(inputs[i]).val() === questions[i].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    }
    this.result();
  },

  result: function() {
    clearInterval(timer);

    $("#question h2").remove();

    trivia.html("<h2>All Done!</h2>");
    trivia.append("<h3>Correct Answers: " + this.correct + "</h3>");
    trivia.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
  }
};

$(document).on("click", "#start", function() {
  game.start();
});

$(document).on("click", "#done", function() {
  game.done();
});
