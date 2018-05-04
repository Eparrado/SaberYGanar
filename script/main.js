
//primera aproximación

function recalcularMarcador(haRespondido, puntos, esCorrecta, tiempo) {
    if (haRespondido && esCorrecta && tiempo <= 2) {
        return puntos + 2;
    } else if (haRespondido && esCorrecta && tiempo <= 10) {
        return puntos + 1;
    } else if (haRespondido && esCorrecta && tiempo > 10) {
        return puntos;
    } else if (haRespondido && !esCorrecta && tiempo <= 10) {
        return puntos - 1;
    } else if (haRespondido && !esCorrecta && tiempo >= 10 && tiempo < 20) {
        return puntos - 2;
    } else if (!haRespondido && tiempo > 20) {
        return puntos - 3;
    }
}

//mejora
function recalcularFallandoPregunta(marcador, tiempo) {
    if (tiempo <= 10) {
        return marcador - 1;
    } else if (tiempo < 20) {
        return marcador - 2;
    }
}

function recalcularAcertandoPregunta(marcador, tiempo) {
    if (tiempo <= 2) {
        return marcador + 2;
    } else if (tiempo <= 10) {
        return marcador + 1;
    } else if (tiempo > 10) {
        return marcador;
    }
}


//caso límite + temporizador
var temporizador = setTimeout(preguntaNoContestada, 21000);
function preguntaNoContestada(marcador) {
    return marcador - 3;
}




