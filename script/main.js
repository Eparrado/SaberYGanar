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
var questionsContainer = document.querySelector('.questions__container');
var nextQuestionButton = document.querySelector('.next--question');
var questionTitle = document.querySelector('.question--title');
var questionAnswers = document.querySelectorAll('.question--answer');
var radioAnswersList = document.querySelectorAll('.input-radio');
var questionsIndex = 0;


function onStart() {
    questionsContainer.classList.remove('hidden');
    startButton.classList.add('hidden');
    playGame();
}

function playGame() {
    renderQuestion(questions[questionsIndex]);
    var timerId = startCountdown(function () {
        questionsIndex++;
        if (questionsIndex < questions.length) {
            renderQuestion(questions[questionsIndex]);

        } else {
            clearInterval(timerId);
            questionsContainer.classList.add('hidden');
            var clock = document.querySelector('.clock');
            clock.classList.add('hidden');
        }
    });
}

function renderQuestion(question) {
    questionTitle.innerHTML = (question.title);
    questionTitle.setAttribute('data-id', question.id);
    for (var x = 0; x < question.answers.length; x++) {
        questionAnswers[x].innerHTML = question.answers[x].answer;
        radioAnswersList[x].setAttribute('data-id', question.answers[x].id);
    }
}

function startCountdown(onTimeOut) {
    var initialTime = 5;
    return setInterval(function () {
        initialTime--;
        if (initialTime >= 0) {
            var clock = document.querySelector('.clock');
            clock.innerHTML = initialTime;
        }
        if (initialTime === 0) {
            initialTime = 5;
            onTimeOut();
        }
    }, 1000);
}

startButton.addEventListener('click', onStart);





function checkUserAnswer() {
    var questionAnswers = document.querySelectorAll('.question--answer');
    var questionTitle = document.querySelector('.question--title');
    var userAnswer;
    var currentQuestion = questions.find(getCurrentQuestion);
    for (var x = 0; x < radioAnswersList.length; x++) {
        if (radioAnswersList[x].checked) {
            userAnswer = radioAnswersList[x].getAttribute('data-id');

            radioAnswersList[x].checked = false;
            compareAnswers(currentQuestion.correctAnswer.id, userAnswer);
        }
    }
}

function getCurrentQuestion(question) {
    if (question.id == questionTitle.getAttribute('data-id')) {
        return question;
    }
}

function compareAnswers(correctAnswer, userAnswer) {
    if (correctAnswer == userAnswer) {
        console.log('OK');
    } else {
        console.log('NOPE');
    }
}

var sendButton = document.querySelector('.send--answer');
sendButton.addEventListener('click', checkUserAnswer);

