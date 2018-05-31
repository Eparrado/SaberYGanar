function application() {

    var questions = [];

    var startButton;
    var startAgainButton;
    var nextQuestionButton;

    var introductionContainer;

    var clock;

    var questionsContainer;
    var questionTitle;
    var questionAnswers;
    var questionsIndex = 0;
    var currentQuestion;

    var resultContainer;
    var resultScore;
    var resultTitle;
    var pointsCounter = 0;
    var radioAnswersList;

    var initialTime = 20;
    var currentTime;
    var timerId;
    var seconds;

    var finalPage;
    var finalScoreContainer;


    function start() {
        startButton = document.querySelector('.start--button');
        startButton.addEventListener('click', onStart);

        clock = document.querySelector('.clock');

        questionsContainer = document.querySelector('.questions--container');
        questionTitle = document.querySelector('.question--title');
        questionAnswers = document.querySelectorAll('.question--answer');
        nextQuestionButton = document.querySelector('.next--question--button');
        nextQuestionButton.addEventListener('click', onNextQuestion);

        resultContainer = document.querySelector('.result--container');
        resultScore = document.querySelector('.result--score');
        resultTitle = document.querySelector('.result--title');
        radioAnswersList = document.querySelectorAll('.input-radio');

        introductionContainer = document.querySelector('.page--introduction');
        finalPage = document.querySelector('.page--section');
        finalScoreContainer = document.querySelector('.final--result');

        startAgainButton = document.querySelector('.replay--button');
        startAgainButton.addEventListener('click', onStartAgain);


        getQuestions(function (data) {
            questions = data;
        });
    }

    function getQuestions(callback) {
        var request = new XMLHttpRequest();
        request.addEventListener('load', function () {
            var data = JSON.parse(request.responseText);
            callback(data);
        });

        request.open('GET', 'http://localhost:3000/api/server-data');
        request.send();
    }

    function onStart() {
        hideIntroductionContainer();
        showQuestionContainer();
        playGame();
        eventListenerRadioCheck();
    }

    function onStartAgain() {
        resetGame();
        onStart();
    }

    function onNextQuestion() {
        updateQuestionIndex();
        if (questionsIndex < questions.length) {
            playGame();
            hideResultContainer();
            showQuestionContainer();
        } else {
            hideResultContainer();
            hideQuestionContainer();
            showFinalPage();
        }
    }

    function onCheckAnswer() {
        stopCountDown();
        checkUserAnswer();
        hideQuestionContainer();
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

    function showResultContainer() {
        resultContainer.classList.remove('hidden');
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



    function resetGame() {
        hideFinalPage();
        resetQuestionIndex();
        resetPointsCounter();
    }

    function playGame() {
        renderQuestion(questions[questionsIndex]);
        timerId = startCountdown(function () {
            if (questionsIndex < questions.length) {
                showResultContainer();
                updatePointsWithoutAnswer();
                stopCountDown();

            } else {
                clearInterval(timerId);
                hideResultContainer();
                hideClock();
            }
        });
    }

    function startCountdown(onTimeOut) {
        currentTime = initialTime;
        return setInterval(function () {
            currentTime--;
            if (currentTime >= 0) {
                var clock = document.querySelector('.clock');
                clock.innerHTML = 'Tiempo: ' + currentTime + ' segundos';
            }
            else if (currentTime < 0) {
                currentTime = initialTime;
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
            updatePointsWithCorrectAnswer();
            resultTitle.innerHTML = 'Has acertado!';
            resultScore.innerHTML = 'Puntuación: ' + pointsCounter;

        } else if (correctAnswer != userAnswer) {
            updatePointsWithInorrectAnswer();
            resultTitle.innerHTML = 'Has fallado!';
            resultScore.innerHTML = 'Puntuación: ' + pointsCounter;

        }
        showResultContainer();
        finalScoreContainer.innerHTML = 'Has conseguido ' + pointsCounter + ' puntos';
    }

    function getAnswerTime() {
        seconds = (initialTime - currentTime);
    }

    function updatePointsWithCorrectAnswer() {
        getAnswerTime();
        if (seconds <= 2) {
            pointsCounter = pointsCounter + 2;
        } else if (seconds <= 10) {
            pointsCounter = pointsCounter + 1;
        } else if (seconds > 10) {
            return pointsCounter;
        }
    }

    function updatePointsWithInorrectAnswer() {
        getAnswerTime();
        if (seconds <= 10) {
            pointsCounter = pointsCounter - 1;
        }
        if (seconds > 10) {
            pointsCounter = pointsCounter - 2;
        }
    }

    function updatePointsWithoutAnswer() {
        pointsCounter = pointsCounter - 3;
        resultTitle.innerHTML = 'Oh vaya! Se te ha terminado el tiempo';
        resultScore.innerHTML = 'Puntuación: ' + pointsCounter;
    }

    function resetPointsCounter() {
        pointsCounter = 0;
    }


    return {
        start: start
    }
}