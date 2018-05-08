/*API para los datos*/
function getQuestions(callback) {

    var serverData = [
        {
            id: 0,
            title: '¿Cuántos años tiene María?',
            answers: [
                { id: 0, answer: '25' },
                { id: 1, answer: '33' },
                { id: 2, answer: '37' }
            ],
            correctAnswer: { id: 1 }
        },
        {
            id: 1,
            title: '¿Cuál es la capital de Zambia?',
            answers: [
                { id: 0, answer: 'Lusaka' },
                { id: 1, answer: 'Harare' },
                { id: 2, answer: 'Madrid' }
            ],
            correctAnswer: { id: 0 }
        },
        {
            id: 2,
            title: '¿Cuál es el nombre completo de Freud?',
            answers: [
                { id: 0, answer: 'Adolf' },
                { id: 1, answer: 'Sefarad' },
                { id: 2, answer: 'Sigmund' }
            ],
            correctAnswer: { id: 2 }
        },
        {
            id: 3,
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

/*Temporizador*/
var totalTime = 21;
var timer = setInterval(showTimeInterval, 1000);

function showTimeInterval() {
    totalTime--;
    var clock = document.querySelector('.clock');
    clock.innerHTML = totalTime;
    if (totalTime === 0) {
        renderQuestion();
    }
}

/*Botón inicio*/
var startButton = document.querySelector('.start--button');
var questionsContainer = document.querySelector('.questions__container');

function showAndStartQuestionContainer() {
    questionsContainer.classList.toggle('hidden');
    startButton.classList.toggle('hidden');
    renderQuestion();
    showTimeInterval();
}

startButton.addEventListener('click', showAndStartQuestionContainer);


/*Botón siguiente pregunta*/
var nextQuestionButton = document.querySelector('.next--question');
var questionTitle = document.querySelector('.question--title');
var questionAnswers = document.querySelectorAll('.question--answer');
var i = 0;

function renderQuestion() {
    totalTime = 21;
    showTimeInterval();
    if (i < questions.length) {
        questionTitle.innerHTML = (questions[i].title);
        for (var x = 0; x < questions[i].answers.length; x++) {
            questionAnswers[x].innerHTML = (questions[i].answers[x].answer);
        }
    }
}

nextQuestionButton.addEventListener('click', renderQuestion);

/*Id de la respuesta del usuario*/
function isCorrect(question, userAnswer) {
    if (question.id !== userAnswer.answerId) {
        console.log('No es la misma pregunta');
    }
    if (question.correctAnswer.id === userAnswer.id) {
        console.log('Es correcta!!');
    } else {
        console.log('Has fallado :(');
    }
}


var radioAnswersList = document.querySelectorAll('.input-radio');
var userAnswerData = [];
function saveAnswerData() {
    for (var x = 0; x < radioAnswersList.length; x++) {
        if (radioAnswersList[x].checked) {
            userAnswerData.push({
                answerId: i,
                id: x
            });

            radioAnswersList[x].checked = false;

            isCorrect(questions[i], userAnswerData[i]);
        }
    }
    i++;
    renderQuestion();
}

var sendButton = document.querySelector('.send--answer');
sendButton.addEventListener('click', saveAnswerData);

