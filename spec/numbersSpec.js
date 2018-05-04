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


describe('calculo de marcador cuando acierta la pregunta', function () {
    function recalcularAcertandoPregunta(marcador, tiempo) {
        if (tiempo <= 2) {
            return marcador + 2;
        } else if (tiempo <= 10) {
            return marcador + 1;
        } else if (tiempo > 10) {
            return marcador;
        }
    }

    it("suma mas puntos si acierta muy rapido", function () {
        expect(recalcularAcertandoPregunta(0, 1)).toBe(2);
        expect(recalcularAcertandoPregunta(2, 1)).toBe(4);
    });

    it("suma menos puntos si acierto más lento", function () {
        expect(recalcularAcertandoPregunta(1, 5)).toBe(2);
        expect(recalcularAcertandoPregunta(0, 12)).toBe(0);
    });
});

describe('calculo del marcador cuando falla la pregunta', function () {
    function recalcularFallandoPregunta(marcador, tiempo) {
        if (tiempo <= 10) {
            return marcador - 1;
        } else if (tiempo < 20) {
            return marcador - 2;
        }
    }

    it("resta menos puntos por faller pero ser rápido", function () {
        expect(recalcularFallandoPregunta(5, 3)).toBe(4);
    });

    it("resta puntos por fallar y ser lento", function () {
        expect(recalcularFallandoPregunta(3, 12)).toBe(1);
        expect(recalcularFallandoPregunta(2, 12)).toBe(0);
    });

});

describe('calculo del marcador cuando se acaba el tiempo', function () {

    var temporizador = setTimeout(preguntaNoContestada, 21000);
    function preguntaNoContestada(marcador) {
        return marcador - 3;
    }

    it("resta puntos si no respondes en menos de 20 segundos", function () {
        expect(preguntaNoContestada(3)).toBe(0);
    });
});


