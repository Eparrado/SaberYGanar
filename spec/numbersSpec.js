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
*      Si en 20 segundos no has respondido , pasa a siguiente pregunta y pierdes 3 punto
*
*
* */


describe('calculo de marcador', function () {
    function recalcularMarcador(puntos, esCorrecta, tiempo) {
        if (esCorrecta && tiempo <= 2) {
            return puntos + 2;
        } else if (esCorrecta && tiempo <= 10) {
            return puntos + 1;
        } else if (!esCorrecta && tiempo <= 10) {
            return puntos - 1;
        } else if (!esCorrecta && tiempo >= 10) {
            return puntos - 2;
        }

        return puntos;
    }

    it("suma mas puntos si acierta muy rapido", function () {
        expect(recalcularMarcador(0, true, 1)).toBe(2);
        expect(recalcularMarcador(2, true, 1)).toBe(4);
    });

    it("suma menos puntos si acierto más lento", function () {
        expect(recalcularMarcador(1, true, 5)).toBe(2);
        expect(recalcularMarcador(0, true, 12)).toBe(0);
    });

    it("resta menos puntos por faller pero ser rápido", function () {
        expect(recalcularMarcador(5, false, 3)).toBe(4);
    });

    it("resta puntos por fallar y ser lento", function () {
        expect(recalcularMarcador(3, false, 12)).toBe(1);
        expect(recalcularMarcador(2, false, 12)).toBe(0);
    });
});