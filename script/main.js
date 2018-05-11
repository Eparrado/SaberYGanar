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
var questionsContainer = document.querySelector('.questions--container');
var nextQuestionButton = document.querySelector('.next--question--button');
var questionTitle = document.querySelector('.question--title');
var questionAnswers = document.querySelectorAll('.question--answer');
var radioAnswersList = document.querySelectorAll('.input-radio');
var resultContainer = document.querySelector('.result--container');
var resultTitle = document.querySelector('.result--title');
var resultScore = document.querySelector('.result-score');
var introductionContainer = document.querySelector('.page--introduction');
var questionsIndex = 0;
var timerId;
var initialTime;
startButton.addEventListener('click', onStart);
var currentQuestion;
nextQuestionButton.addEventListener('click', onNextQuestion);
var finalPage = document.querySelector('.page--section');
var startAgainButton = document.querySelector('.replay--button');
startAgainButton.addEventListener('click', onStartAgain);


function onStart() {
    hideIntroductionContainer();
    showQuestionContainer();
    playGame();
    eventListenerRadioCheck();
}

function onStartAgain() {
    hideFinalPage();
    showQuestionContainer();
    resetQuestionIndex();
    playGame();
    eventListenerRadioCheck();
}

function onNextQuestion() {
    updateQuestionIndex();
    if (questionsIndex < questions.length) {
        playGame();
        hideResultContainer();
    } else {
        hideResultContainer();
        hideQuestionContainer();
        showFinalPage();
    }
}

function onCheckAnswer() {
    stopCountDown();
    checkUserAnswer();
}

function playGame() {
    renderQuestion(questions[questionsIndex]);
    timerId = startCountdown(function () {
        updateQuestionIndex();
        if (questionsIndex < questions.length) {
            renderQuestion(questions[questionsIndex]);

        } else {
            clearInterval(timerId);
            hideResultContainer();
            hideClock();
        }
    });
}

function hideIntroductionContainer() {
    introductionContainer.classList.add('hidden');
}

function hideClock() {
    clock.classList.add('hidden');
}

function hideResultContainer() {
    resultContainer.classList.add('hidden');
}

function showQuestionContainer() {
    questionsContainer.classList.remove('hidden');
}

function hideQuestionContainer() {
    questionsContainer.classList.add('hidden');
}

function showFinalPage() {
    finalPage.classList.remove('hidden');
}

function hideFinalPage() {
    finalPage.classList.add('hidden');
}


function startCountdown(onTimeOut) {
    initialTime = 21;
    return setInterval(function () {
        initialTime--;
        if (initialTime >= 0) {
            var clock = document.querySelector('.clock');
            clock.innerHTML = 'Tiempo: ' + initialTime + ' segundos';
        }
        else if (initialTime < 0) {
            initialTime = 21;
            onTimeOut();
        }
    }, 1000);
}

function stopCountDown() {
    clearInterval(timerId);
    clock.innerHTML = 'Tiempo: -';
}

function updateQuestionIndex() {
    questionsIndex++;
}

function resetQuestionIndex() {
    return questionsIndex = 0;
}

function renderQuestion(question) {
    questionTitle.innerHTML = (question.title);
    questionTitle.setAttribute('data-id', question.id);
    for (var x = 0; x < question.answers.length; x++) {
        questionAnswers[x].innerHTML = question.answers[x].answer;
        radioAnswersList[x].setAttribute('data-id', question.answers[x].id);
    }
}

function eventListenerRadioCheck() {
    radioAnswersList.forEach(function (radio) {
        radio.addEventListener('click', onCheckAnswer);
    });
}

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



