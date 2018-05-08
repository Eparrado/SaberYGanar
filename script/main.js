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
            correctAnswer: { id: 2 }
        },
        {
            id: 2,
            title: '¿Cuál es la capital de Zambia?',
            answers: [
                { id: 0, answer: 'Lusaka' },
                { id: 1, answer: 'Harare' },
                { id: 2, answer: 'Madrid' }
            ],
            correctAnswer: { id: 1 }
        },
        {
            id: 3,
            title: '¿Cuál es el nombre completo de Freud?',
            answers: [
                { id: 0, answer: 'Adolf' },
                { id: 1, answer: 'Sefarad' },
                { id: 2, answer: 'Sigmund' }
            ],
            correctAnswer: { id: 3 }
        },
        {
            id: 4,
            title: '¿Cuál es el animal más rápido del mundo?',
            answers: [
                { id: 0, answer: 'Guepardo' },
                { id: 1, answer: 'León' },
                { id: 2, answer: 'Tortuga' }
            ],
            correctAnswer: { id: 1 }
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
        i++;
    }
}


nextQuestionButton.addEventListener('click', renderQuestion);

/*Id de la respuesta del usuario*/

var radioAnswersList = document.querySelectorAll('.input-radio');
function listenerEvents() {
    for (var i = 0; i < radioAnswersList.length; i++) {
        radioAnswersList[i].addEventListener('click', saveAnswerData);
    }
}

var userAnswerId;
var answersOptions = document.querySelectorAll('.asnwer--option');

function saveAnswerData(event) {
    var answersListId = event.currentTarget.getAttribute('data-id');
    userAnswerId = answersListId;
}

listenerEvents();

/*Evento botón enviar*/
var sendAnswerButton = document.querySelector('.send--answer');

function isCorrect(question, userAnswerId) {
    if (questions[i].correctAnswer.id === userAnswerId) {
        console.log('Correcto!!');
    } else {
        console.log('Incorrecta :(');
    }
}
sendAnswerButton.addEventListener('click', isCorrect);
