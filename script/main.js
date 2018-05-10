/*API para los datos*/
function getQuestions(callback) {

    var serverData = [
        {
            id: 1,
            title: '¿Cuántos años tiene María?',
            answers: [
                { id: 0, answer: '25' },
                { id: 1, answer: '33' },
                { id: 2, answer: '37' }
            ],
            correctAnswer: { id: 1 }
        },
        {
            id: 2,
            title: '¿Cuál es la capital de Zambia?',
            answers: [
                { id: 0, answer: 'Lusaka' },
                { id: 1, answer: 'Harare' },
                { id: 2, answer: 'Madrid' }
            ],
            correctAnswer: { id: 0 }
        },
        {
            id: 3,
            title: '¿Cuál es el nombre completo de Freud?',
            answers: [
                { id: 0, answer: 'Adolf' },
                { id: 1, answer: 'Sefarad' },
                { id: 2, answer: 'Sigmund' }
            ],
            correctAnswer: { id: 2 }
        },
        {
            id: 4,
            title: '¿Cuál es el animal más rápido del mundo?',
            answers: [
                { id: 0, answer: 'Guepardo' },
                { id: 1, answer: 'León' },
                { id: 2, answer: 'Tortuga' }
            ],
            correctAnswer: { id: 0 }
        }
    ];
    callback(serverData);
}

var questions = [];
getQuestions(function (data) {
    questions = data;
});


var startButton = document.querySelector('.start--button');
var clock = document.querySelector('.clock');
var questionsContainer = document.querySelector('.questions__container');
var nextQuestionButton = document.querySelector('.next--question--button');
var questionTitle = document.querySelector('.question--title');
var questionAnswers = document.querySelectorAll('.question--answer');
var radioAnswersList = document.querySelectorAll('.input-radio');
var resultContainer = document.querySelector('.result--container');
var resultTitle = document.querySelector('.result--title');
var resultScore = document.querySelector('.result-score');
var questionsIndex = 0;
var timerId;
var initialTime;


function onStart() {
    questionsContainer.classList.remove('hidden');
    startButton.classList.add('hidden');
    playGame();
    eventListenerRadioCheck();
}

function playGame() {
    renderQuestion(questions[questionsIndex]);
    timerId = startCountdown(function () {
        questionsIndex++;
        if (questionsIndex < questions.length) {
            renderQuestion(questions[questionsIndex]);

        } else {
            clearInterval(timerId);
            hideResultContainer();
            hideClock();
        }
    });
}

function hideResultContainer() {
    resultContainer.classList.add('hidden');
}

function hideClock() {
    clock.classList.add('hidden');
}

function renderQuestion(question) {
    questionTitle.innerHTML = (question.title);
    questionTitle.setAttribute('data-id', question.id);
    for (var x = 0; x < question.answers.length; x++) {
        questionAnswers[x].innerHTML = question.answers[x].answer;
        radioAnswersList[x].setAttribute('data-id', question.answers[x].id);
    }
    hideResultContainer();
}


function onNextQuestion() {
    questionsIndex++;
    playGame();
    hideResultContainer();
}

function startCountdown(onTimeOut) {
    initialTime = 21;
    return setInterval(function () {
        initialTime--;
        if (initialTime >= 0) {
            var clock = document.querySelector('.clock');
            clock.innerHTML = 'Tiempo: ' + initialTime + ' segundos';
        }
        if (initialTime === 0) {
            initialTime = 21;
            onTimeOut();
        }
    }, 1000);
}

function stopCountDown() {
    clearInterval(timerId);
    clock.innerHTML = 'Tiempo: -';
}

startButton.addEventListener('click', onStart);

var currentQuestion;
function checkUserAnswer() {
    var questionAnswers = document.querySelectorAll('.question--answer');
    var questionTitle = document.querySelector('.question--title');
    var userAnswer;
    getCurrentQuestion();
    for (var x = 0; x < radioAnswersList.length; x++) {
        if (radioAnswersList[x].checked) {
            userAnswer = radioAnswersList[x].getAttribute('data-id');
            questionAnswers[x].classList.toggle('answer--selected');
            compareAnswers(currentQuestion.correctAnswer.id, userAnswer);
        }
        radioAnswersList[x].checked = false;
    }
}

function getCurrentQuestion() {
    currentQuestion = questions.find(function (question) {
        if (question.id == questionTitle.getAttribute('data-id')) {
            return question;
        }
    });
    return currentQuestion;
}

function compareAnswers(correctAnswer, userAnswer) {
    if (correctAnswer == userAnswer) {
        resultTitle.innerHTML = 'Has acertado!';
    } else {
        resultTitle.innerHTML = 'Has fallado!';
    }
    resultContainer.classList.remove('hidden');
}

function onCheckAnswer() {
    stopCountDown();
    getCurrentQuestion();
    if (currentQuestion.id < questions.length) {
        checkUserAnswer();
    } else {
        nextQuestionButton.classList.add('hidden');
        console.log('Has terminado el juego. Puntuación: blabla');
    }
}

function eventListenerRadioCheck() {
    radioAnswersList.forEach(function (radio) {
        radio.addEventListener('click', onCheckAnswer);
    });
}

nextQuestionButton.addEventListener('click', onNextQuestion);
