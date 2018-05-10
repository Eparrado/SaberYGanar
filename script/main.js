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

/*Botón inicio*/
var startButton = document.querySelector('.start--button');
var questionsContainer = document.querySelector('.questions__container');

function showAndStartQuestionContainer() {
    questionsContainer.classList.toggle('hidden');
    startButton.classList.toggle('hidden');
    renderQuestion();
}

startButton.addEventListener('click', renderQuestion);

/*Botón siguiente pregunta*/
var nextQuestionButton = document.querySelector('.next--question');
var questionTitle = document.querySelector('.question--title');
var questionAnswers = document.querySelectorAll('.question--answer');
var radioAnswersList = document.querySelectorAll('.input-radio');
var questionsIndex = 0;

function renderQuestion() {
    startCountdown();
    questionsContainer.classList.remove('hidden');
    nextQuestionButton.classList.add('hidden');
    if (questionsIndex < questions.length) {
        questionTitle.innerHTML = (questions[questionsIndex].title);
        questionTitle.setAttribute('id', questions[questionsIndex].id);
        for (var x = 0; x < questions[questionsIndex].answers.length; x++) {
            questionAnswers[x].innerHTML = (questions[questionsIndex].answers[x].answer);
            radioAnswersList[x].setAttribute('id', questions[questionsIndex].answers[x].id);
        }
    } else {
        questionsContainer.classList.toggle('hidden');
    }
}

nextQuestionButton.addEventListener('click', renderQuestion);

/*Temporizador*/
function startCountdown() {
    var initialTime = 10;
    setInterval(function () {
        initialTime--;
        if (initialTime >= 0) {
            var clock = document.querySelector('.clock');
            clock.innerHTML = initialTime;
        }
        if (initialTime === 0) {
            clearInterval(initialTime);
            questionsIndex++;
            renderQuestion();
        }
    }, 1000);
}


// /*Guardar y enviar respuesta del usuario*/
// var userAnswerData = [];
// var userAnswer;
// function saveAnswerData() {
//     for (var x = 0; x < radioAnswersList.length; x++) {
//         if (radioAnswersList[x].checked) {
//             userAnswer = radioAnswersList[x];

//             radioAnswersList[x].checked = false;

//             isCorrect(questions[i], userAnswer[i]);
//         }
//     }
// }

// var resultContainer = document.querySelector('.right--answer');
// function isCorrect(question, userAnswer) {
//     nextQuestionButton.classList.remove('hidden');
//     sendButton.classList.add('hidden');

//     if (question.id !== userAnswer.answerId) {
//         resultContainer.innerHTML = 'No es la misma pregunta';
//     }
//     if (question.correctAnswer.id === userAnswer.id) {
//         resultContainer.innerHTML = 'Es correcta!!';
//     } else {
//         resultContainer.innerHTML = 'Has fallado :(';
//     }
// }


// function sendAnswerData() {
//     saveAnswerData();
//     i++;
// }

// var sendButton = document.querySelector('.send--answer');
// sendButton.addEventListener('click', sendAnswerData);

