
var card = $("#quiz-area");

var countStartNumber = 20;

//global variables
var questions = [{
    question: "What kind of animal is Retsuko?",
    answers: ["Raccoon", "Red Panda", "Cat", "Fox"],
    correctAnswer: "Red Panda"
}, {
    question: "Retsuko takes out her frustration by going to the kareoke bar and singing ____.",
    answers: ["ABBA", "Country", "Adele", "Death Metal"],
    correctAnswer: "Death Metal"
}, {
    question: "Retsuko bonds with two new friends, Washimi and Gori, at ____. ",
    answers: ["Sunday Brunch", "Work", "Yoga Class", "The Spa"],
    correctAnswer: "Yoga Class"
}, {
    question: "Retsuko's star sign is _____.",
    answers: ["Scorpio", "Leo", "Aries", "Aquarius"],
    correctAnswer: "Scorpio"
}];

var timer;
//console.log(questions[0].answers);

var game = {
    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,

    countdown: function () {
        game.counter--;
        $("#show-countdown").text(game.counter);
        if (game.counter === 0) {
            console.log("TIME IS UP");
            game.timeUp();
        }
    },

    loadQuestion: function () {

        timer = setInterval(game.countdown, 2 * 1000);

        card.html("<h2 class='q'>" + questions[this.currentQuestion].question + "</h2>");

        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            card.append("<button type='button' class='btn answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
                + "'>" + questions[this.currentQuestion].answers[i] + "</button><br>");
        }
    },

    nextQuestion: function () {
        game.counter = countStartNumber;
        $("#show-countdown").text(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },

    timeUp: function () {

        clearInterval(timer);

        $("#show-countdown").html(game.counter);

        alert("Time's Up!");
        card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 2 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 2 * 1000);
        }
    },

    results: function () {

        clearInterval(timer);

        card.html("<h2>Final Score</h2>");

        $("#show-countdown").text(game.counter);

        card.append("<h3>Correct Answers: " + game.correct + "</h3>");
        card.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
        card.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
        card.append("<br><button type='button' class='btn' id='start-over'>Start Over?</button>");
    },

    clicked: function (e) {
        clearInterval(timer);
        if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();
        }
        else {
            this.answeredIncorrectly();
        }
    },

    answeredIncorrectly: function () {

        game.incorrect++;

        clearInterval(timer);


        card.html("<h2>Wrong!</h2>");
        card.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 2 * 1000);
        }
        else {
            setTimeout(this.nextQuestion, 2 * 1000);
        }
    },

    answeredCorrectly: function () {

        clearInterval(timer);

        game.correct++;

        card.html("<h2>Correct!</h2>");

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 2 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 2 * 1000);
        }
    },

    reset: function () {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
}


//click events

$(document).on("click", "#start-over", function () {
    game.reset();
});

$(document).on("click", ".answer-button", function (e) {
    game.clicked(e);
});

$(document).on("click", "#start", function () {
    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='show-countdown'>20</span> Seconds</h2>");
    game.loadQuestion();
});
