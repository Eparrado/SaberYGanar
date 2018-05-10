function application() {

    var questions = [];
    var startButton;
    var questionsContainer;
    var nextQuestionButton;
    var questionTitle;
    var questionAnswers;
    var radioAnswersList;
    var questionsIndex = 0;

    function start(){
        startButton = document.querySelector('.start--button');
        questionsContainer = document.querySelector('.questions__container');
        startButton.addEventListener('click', renderQuestion);
        nextQuestionButton = document.getElementById('next--question--button');
        questionTitle = document.querySelector('.question--title');
        questionAnswers = document.querySelectorAll('.question--answer');
        radioAnswersList = document.querySelectorAll('.input-radio');
        nextQuestionButton.addEventListener('click', renderQuestion);
        getQuestions(function (data) {
            questions = data;
        });
    }

    function getQuestions(callback) {

        var serverData = [
            {
                id: 1,
                title: '¿Cuántos años tiene María?',
                answers: [
                    {id: 0, answer: '25'},
                    {id: 1, answer: '33'},
                    {id: 2, answer: '37'}
                ],
                correctAnswer: {id: 1}
            },
            {
                id: 2,
                title: '¿Cuál es la capital de Zambia?',
                answers: [
                    {id: 0, answer: 'Lusaka'},
                    {id: 1, answer: 'Harare'},
                    {id: 2, answer: 'Madrid'}
                ],
                correctAnswer: {id: 0}
            },
            {
                id: 3,
                title: '¿Cuál es el nombre completo de Freud?',
                answers: [
                    {id: 0, answer: 'Adolf'},
                    {id: 1, answer: 'Sefarad'},
                    {id: 2, answer: 'Sigmund'}
                ],
                correctAnswer: {id: 2}
            },
            {
                id: 4,
                title: '¿Cuál es el animal más rápido del mundo?',
                answers: [
                    {id: 0, answer: 'Guepardo'},
                    {id: 1, answer: 'León'},
                    {id: 2, answer: 'Tortuga'}
                ],
                correctAnswer: {id: 0}
            }
        ];
        callback(serverData);
    }

    function renderQuestion() {
        startCountdown();
        questionsContainer.classList.remove('hidden');
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

    return {
        start: start
    }
}