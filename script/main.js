
// //primera aproximación

// function recalcularMarcador(haRespondido, puntos, esCorrecta, tiempo) {
//     if (haRespondido && esCorrecta && tiempo <= 2) {
//         return puntos + 2;
//     } else if (haRespondido && esCorrecta && tiempo <= 10) {
//         return puntos + 1;
//     } else if (haRespondido && esCorrecta && tiempo > 10) {
//         return puntos;
//     } else if (haRespondido && !esCorrecta && tiempo <= 10) {
//         return puntos - 1;
//     } else if (haRespondido && !esCorrecta && tiempo >= 10 && tiempo < 20) {
//         return puntos - 2;
//     } else if (!haRespondido && tiempo > 20) {
//         return puntos - 3;
//     }
// }

// //mejora
// function recalcularFallandoPregunta(marcador, tiempo) {
//     if (tiempo <= 10) {
//         return marcador - 1;
//     }
//     if (tiempo > 10) {
//         return marcador - 2;
//     }
// }

// function recalcularAcertandoPregunta(marcador, tiempo) {
//     if (tiempo <= 2) {
//         return marcador + 2;
//     }
//     if (tiempo <= 10) {
//         return marcador + 1;
//     }
//     if (tiempo > 10) {
//         return marcador;
//     }
// }


// //caso límite + temporizador
// var temporizador = setTimeout(preguntaNoContestada, 21000);
// function preguntaNoContestada(marcador) {
//     return marcador - 3;
// }


var questions = [
    {
        id: 1,
        title: '¿Cuántos años tiene María?',
        answers: [
            { id: 1, answer: '25' },
            { id: 2, answer: '33' },
            { id: 3, answer: '37' }
        ],
        correctAnswer: { id: 2 }
    },
    {
        id: 2,
        title: '¿Cuál es la capital de Zambia?',
        answers: [
            { id: 1, answer: 'Lusaka' },
            { id: 2, answer: 'Harare' },
            { id: 3, answer: 'Madrid' }
        ],
        correctAnswer: { id: 1 }
    },
    {
        id: 3,
        title: '¿Cuál es el nombre completo de Freud?',
        answers: [
            { id: 1, answer: 'Adolf' },
            { id: 2, answer: 'Sefarad' },
            { id: 3, answer: 'Sigmund' }
        ],
        correctAnswer: { id: 3 }
    },
    {
        id: 4,
        title: '¿Cuál es el animal más rápido del mundo?',
        answers: [
            { id: 1, answer: 'Guepardo' },
            { id: 2, answer: 'León' },
            { id: 3, answer: 'Tortuga' }
        ],
        correctAnswer: { id: 1 }
    }
];
function renderQuestion(i) {
    console.log(questions[i].title);
}


for (let i; i < questions.length; i++) {
    setInterval(renderQuestion(i), 2000);
}










function isCorrect(question, userAnswer) {
    if (question.id !== userAnswer.answerId) {
        return false;
    }
    if (question.correctAnswer.id === userAnswer.id) {
        return true;
    } else {
        return false;
    }
}

