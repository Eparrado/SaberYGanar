/* TO DO - list
*
*   velocidad de respuesta, acierto o fallo
*
*      Si acierto pregunta en menos de 2 segundos - sumo 2 puntos
*           Caso de estudio - (0 puntos, pregunta correcta, 1 segundo) -> 2 puntos
*           Caso de estudio - (1 punto, correcta, 1 segundo) -> 3 puntos
*      
*      Si fallo pregunta en mas de 10 segundos - resto 2 puntos
*           Caso de estudio - (3 puntos, incorrecta, 12 segundos) - 1 punto
*           Caso de estudio - (2 puntos, incorrecta, 12 segundos) - 0 puntos           
*
*      Si acierto pregunta entre 2 y 10 segundos - sumo 1 punto
*           Caso de estudio - (1 punto, correcta, 5 segundos) -> 2 puntos
*      
*      Si acierto y tardo mas de 10 segundos - 0 puntos
*           Caso de estudio - (1 punto, correcta, 12 segundos) -> 1 punto 
*
*      Si fallo antes de 10 segundos - resto 1 punto
*           Caso de estudio - (5 puntos, incorrecta, 3 segundos) -> 4 puntos
*
*      No se puede pasar sin responder
*
*      Si en 20 segundos no has respondido, pasa a siguiente pregunta y pierdes 3 punto
*
*
* */

/*
* TO DO - List 
*
*  reponder a las preguntas, acierto o fallo
*    
*      Si respongo correctente - Acierto la pregunta
*        Caso de estudio - La respuesta del usuario es igual que la correcta -> isCorrect es true
*
*      Si respondo incorrectamente - Fallo la pregunta
*        Caso de estudio - La respuesta del usuario es distinta a la correcta -> isCorrect es false
*
*      Si las respuestas no corresponden a esa pregunta 
*        Caso de estudio - Las respuestan tienen un id diferente al que tiene la pregunta - isCorrect es false y no sigue con la función
*
*/

describe('comprobar si la respuesta es correcta', function () {
    var question = {
        id: 1,
        title: '¿Qué día es hoy?',
        answers: [
            { id: 1, answer: 'Lunes' },
            { id: 2, answer: 'Jueves' },
            { id: 3, answer: 'Viernes' }
        ],
        correctAnswer: { id: 3 }
    };
    var userAnswerIncorrect = { answerId: 1, id: 2 };
    var userAnswerCorrect = { answerId: 1, id: 3 };
    var userAnswerDiferentId = { answerId: 3, id: 3 };

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

    it('reconoce una respuesta correcta', function () {
        expect(isCorrect(question, userAnswerCorrect)).toBeTruthy();
    });

    it('reconoce una respuesta incorrecta', function () {
        expect(isCorrect(question, userAnswerIncorrect)).toBeFalsy();
    });

    it('reconoce si se está responiendo la respuesta que corresponde a esa pregunta', function () {
        expect(isCorrect(question, userAnswerDiferentId)).toBeFalsy();
    });

});


describe('calculo de marcador', function () {
    function recalcularAcertandoPregunta(marcador, tiempo) {
        if (tiempo <= 2) {
            return marcador + 2;
        }
        if (tiempo <= 10) {
            return marcador + 1;
        }
        if (tiempo > 10) {
            return marcador;
        }
    }

    function recalcularFallandoPregunta(marcador, tiempo) {
        if (tiempo <= 10) {
            return marcador - 1;
        }
        if (tiempo > 10) {
            return marcador - 2;
        }
    }

    function recalcularSinRespuesta(marcador) {
        return marcador - 3;
    }

    it("suma mas puntos si acierta muy rapido", function () {
        expect(recalcularAcertandoPregunta(0, 1)).toBe(2);
        expect(recalcularAcertandoPregunta(2, 1)).toBe(4);
    });

    it("suma menos puntos si acierto más lento", function () {
        expect(recalcularAcertandoPregunta(1, 5)).toBe(2);
        expect(recalcularAcertandoPregunta(0, 12)).toBe(0);
    });

    it("resta menos puntos por faller pero ser rápido", function () {
        expect(recalcularFallandoPregunta(5, 3)).toBe(4);
    });

    it("resta puntos por fallar y ser lento", function () {
        expect(recalcularFallandoPregunta(3, 12)).toBe(1);
        expect(recalcularFallandoPregunta(2, 12)).toBe(0);
    });

    it("resta puntos si no respondes en menos de 20 segundos", function () {
        expect(recalcularSinRespuesta(3)).toBe(0);
    });
});


