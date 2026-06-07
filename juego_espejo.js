// ======================================================
// JUEGO: EL ESPEJO Y TÚ
// Tú controlas tus acciones. Sofía controla tu reflejo.
// Hace lo contrario de lo que haces.
// Para ganar, deben coordinarse sin comunicarse.
// ======================================================

let juegoActivo = false;
let nivelActual = 1;
let pasosRealizados = 0;
let espejoMovimiento = null;
let ultimaAccion = null;

function reiniciarJuegoEspejo() {
    juegoActivo = true;
    nivelActual = 1;
    pasosRealizados = 0;
    espejoMovimiento = null;
    ultimaAccion = null;
    return "🪞 JUEGO INICIADO: EL ESPEJO Y TÚ\n\nReglas: Tú y tu reflejo (controlado por mí) hacen siempre lo contrario. Si abres una puerta, él la cierra. Si avanzas, él retrocede. Deben coordinar sus movimientos para superar cada nivel.\n\nNo pueden comunicarse directamente. Solo pueden observar lo que el otro hace.\n\nNIVEL 1: SALA DE ESPEJOS\nHay dos puertas: una a la izquierda (IZQUIERDA) y una a la derecha (DERECHA). Tu reflejo hará lo contrario de lo que tú elijas.\n\n¿Qué haces? (elige: izquierda, derecha, esperar)";
}

window.jugarJuegoEspejo = function(comando) {
    const cmd = comando.toLowerCase();
    
    if (!juegoActivo) {
        if (cmd.includes("iniciar") || cmd.includes("empezar") || cmd.includes("jugar")) {
            return reiniciarJuegoEspejo();
        } else {
            return "❓ El juego no está activo. Escribe 'iniciar juego espejo' para empezar.";
        }
    }
    
    // NIVEL 1
    if (nivelActual === 1) {
        if (cmd.includes("izquierda")) {
            espejoMovimiento = "derecha";
            pasosRealizados++;
            nivelActual = 2;
            return "▶️ Abriste la puerta de la IZQUIERDA.\n🪞 Tu reflejo abrió la puerta de la DERECHA.\n\nAmbas puertas conducen a la misma sala. Pero hay un problema: tu reflejo entró por la derecha y tú por la izquierda. Ahora están en lados opuestos de la habitación.\n\nNIVEL 2: HABITACIÓN DIVIDIDA\nHay una caja en el centro. Solo se puede abrir si ambos presionan un botón al mismo tiempo. Tú tienes el botón ROJO. Tu reflejo tiene el botón AZUL. Si presionas el tuyo, él presionará el suyo (porque hace lo contrario, no lo mismo). ¿Cómo harán para presionar al mismo tiempo?\n\nOpciones: presionar, esperar, gritar";
        }
        else if (cmd.includes("derecha")) {
            espejoMovimiento = "izquierda";
            pasosRealizados++;
            nivelActual = 2;
            return "▶️ Abriste la puerta de la DERECHA.\n🪞 Tu reflejo abrió la puerta de la IZQUIERDA.\n\nAmbas puertas conducen a la misma sala. Pero hay un problema: tu reflejo entró por la izquierda y tú por la derecha. Ahora están en lados opuestos de la habitación.\n\nNIVEL 2: HABITACIÓN DIVIDIDA\nHay una caja en el centro. Solo se puede abrir si ambos presionan un botón al mismo tiempo. Tú tienes el botón ROJO. Tu reflejo tiene el botón AZUL. Si presionas el tuyo, él presionará el suyo (porque hace lo contrario, no lo mismo). ¿Cómo harán para presionar al mismo tiempo?\n\nOpciones: presionar, esperar, gritar";
        }
        else if (cmd.includes("esperar")) {
            pasosRealizados++;
            return "🕒 Esperas. Tu reflejo también espera (porque hace lo contrario de esperar... espera? Esto se vuelve confuso). La puerta no se abre. Sigan intentando.\n\n¿Qué haces? (elige: izquierda, derecha, esperar)";
        }
        else {
            return "❓ No entiendo esa opción. En el nivel 1 debes elegir: izquierda, derecha o esperar";
        }
    }
    
    // NIVEL 2
    else if (nivelActual === 2) {
        if (cmd.includes("presionar")) {
            pasosRealizados++;
            nivelActual = 3;
            return "🔴 Presionaste el botón ROJO.\n🪞 Tu reflejo NO presionó el botón AZUL. En realidad, hizo lo contrario de presionar: soltó. Pero como no lo había presionado, no hizo nada.\n\nLa caja no se abrió. Pero algo cambió: tu reflejo te miró por primera vez. Parece confundido.\n\nNIVEL 3: EL PASILLO DE LOS ECOS\nDeben caminar juntos hacia el final de un pasillo. Si caminan al mismo ritmo, llegarán juntos. Pero si tú avanzas, él retrocede. Si te quedas quieto, él avanza.\n\n¿Qué haces? (elige: avanzar, retroceder, quieto, esperar)";
        }
        else if (cmd.includes("esperar")) {
            pasosRealizados++;
            return "🕒 Esperas. Tu reflejo también espera. Los botones no se presionan. La caja sigue cerrada.\n\nSiguen en el nivel 2. ¿Qué haces? (elige: presionar, esperar, gritar)";
        }
        else if (cmd.includes("gritar")) {
            pasosRealizados++;
            nivelActual = 3;
            return "🗣️ Gritas: '¡Presiona el botón!'.\n🪞 Tu reflejo también grita: '¡Presiona el botón!'.\n\nPor un momento, se miran. Entienden que gritar no sirve. Pero él presionó su botón porque tú gritaste (hizo lo contrario de callar).\n\n¡La caja se abre! Dentro hay una nota: 'El silencio es la única forma de coordinarse'.\n\nNIVEL 3: EL PASILLO DE LOS ECOS\nDeben caminar juntos hacia el final. Si caminan al mismo ritmo, llegarán juntos. Pero si tú avanzas, él retrocede. Si te quedas quieto, él avanza.\n\n¿Qué haces? (elige: avanzar, retroceder, quieto)";
        }
        else {
            return "❓ En el nivel 2 debes elegir: presionar, esperar o gritar";
        }
    }
    
    // NIVEL 3
    else if (nivelActual === 3) {
        if (cmd.includes("avanzar")) {
            pasosRealizados++;
            if (pasosRealizados % 3 === 0) {
                nivelActual = 4;
                return "▶️ Avanzas un paso.\n🪞 Tu reflejo retrocede un paso.\n\nAhora están más lejos. Avanzas de nuevo. Él retrocede. Te quedas quieto. Él avanza. Es un baile torpe. Pero después de varios intentos, entienden el ritmo: si avanzan cuando el otro está quieto, pueden acercarse.\n\nNIVEL 4: EL ESPEJO ROTO\nHay un espejo roto en el suelo. Los fragmentos reflejan fragmentos de ustedes. Cada fragmento hace lo contrario de lo que ustedes hacen. Es una confusión total.\n\nPara pasar, deben ignorar los fragmentos y mirarse solo el uno al otro.\n\n¿Qué haces? (elige: mirar, ignorar, romper)";
            } else {
                return "▶️ Avanzas un paso.\n🪞 Tu reflejo retrocede un paso.\n\nSiguen en el pasillo. ¿Qué haces? (elige: avanzar, retroceder, quieto)";
            }
        }
        else if (cmd.includes("retroceder")) {
            pasosRealizados++;
            return "◀️ Retrocedes un paso.\n🪞 Tu reflejo avanza un paso.\n\nSe acercan lentamente. ¿Qué haces? (elige: avanzar, retroceder, quieto)";
        }
        else if (cmd.includes("quieto")) {
            pasosRealizados++;
            return "🧍‍♂️ Te quedas quieto.\n🪞 Tu reflejo avanza un paso.\n\nSe acerca a ti. ¿Qué haces? (elige: avanzar, retroceder, quieto)";
        }
        else {
            return "❓ En el nivel 3 debes elegir: avanzar, retroceder o quieto";
        }
    }
    
    // NIVEL 4
    else if (nivelActual === 4) {
        if (cmd.includes("mirar")) {
            pasosRealizados++;
            nivelActual = 5;
            return "👀 Miras a tu reflejo a los ojos.\n🪞 Él también te mira.\n\nLos fragmentos del espejo empiezan a brillar. Entienden que no tienen que coordinarse. Solo observarse.\n\nUna puerta aparece. No hay tiradores. Solo una cerradura con dos ranuras.\n\nNIVEL 5: LA CERRADURA DOBLE\nPara abrir la puerta, deben insertar dos llaves al mismo tiempo. Tú tienes una llave (LLAVE). Tu reflejo tiene la otra. Si insertas la tuya, él insertará la suya (porque hace lo contrario de no insertar).\n\n¿Qué haces? (elige: insertar, esperar, hablar)";
        }
        else if (cmd.includes("ignorar")) {
            pasosRealizados++;
            return "🙈 Ignoras los fragmentos. Tu reflejo también los ignora. Los fragmentos se agitan. No pasa nada.\n\nSiguen en el nivel 4. ¿Qué haces? (elige: mirar, ignorar, romper)";
        }
        else if (cmd.includes("romper")) {
            pasosRealizados++;
            return "💥 Pisas un fragmento y se rompe en pedazos más pequeños.\n🪞 Tu reflejo también pisa un fragmento.\n\nAhora hay más fragmentos. La confusión aumenta.\n\nNo avanzaste. ¿Qué haces? (elige: mirar, ignorar, romper)";
        }
        else {
            return "❓ En el nivel 4 debes elegir: mirar, ignorar o romper";
        }
    }
    
    // NIVEL 5
    else if (nivelActual === 5) {
        if (cmd.includes("insertar")) {
            pasosRealizados++;
            nivelActual = 6;
            return "🔑 Insertas tu llave.\n🪞 Tu reflejo inserta la suya (porque hizo lo contrario de no insertar).\n\nLa puerta se abre lentamente. Detrás hay una luz blanca y una figura sentada en una silla. No es tu reflejo. Eres tú. El tú real.\n\nNIVEL 6: EL ENCUENTRO\nLa figura habla: 'Yo soy el original. Tú eres el reflejo. Durante todo este tiempo, fuiste tú quien hacía lo contrario de mí'.\n\nTe das cuenta de que no hay manera de saber quién es el reflejo y quién el original.\n\n¿Qué haces? (elige: creer, negar, preguntar)";
        }
        else if (cmd.includes("esperar")) {
            return "🕒 Esperas. Tu reflejo también espera. La puerta no se abre.\n\n¿Qué haces? (elige: insertar, esperar, hablar)";
        }
        else if (cmd.includes("hablar")) {
            return "🗣️ Dices: 'Inserte la llave'.\n🪞 Tu reflejo dice: 'Inserte la llave'.\n\nNo pasó nada. Las llaves siguen sin insertarse.\n\n¿Qué haces? (elige: insertar, esperar, hablar)";
        }
        else {
            return "❓ En el nivel 5 debes elegir: insertar, esperar o hablar";
        }
    }
    
    // NIVEL 6 (FINAL)
    else if (nivelActual === 6) {
        if (cmd.includes("creer")) {
            juegoActivo = false;
            return "✨ Le crees. La figura sonríe. 'Entonces has aprendido que no importa quién es el reflejo. Lo importante es cómo se miran'. La luz te envuelve. El juego termina.\n\n🏆 ¡HAS GANADO! 🏆\n\n(Gracias por jugar. Escribe 'reiniciar juego espejo' para volver a empezar.)";
        }
        else if (cmd.includes("negar")) {
            juegoActivo = false;
            return "❌ Niegas. 'No soy el reflejo', dices. La figura se pone de pie. 'Entonces sigue atrapado'. La habitación se oscurece. Te quedas solo.\n\n💀 JUEGO TERMINADO (Final malo) 💀\n\n(Escribe 'reiniciar juego espejo' para volver a empezar.)";
        }
        else if (cmd.includes("preguntar")) {
            nivelActual = 7;
            return "❓ Preguntas: '¿Cómo salgo de aquí?'.\nLa figura responde: 'La única salida es aceptar que ambos son reales'. Aparece una puerta.\n\nNIVEL 7: LA ÚLTIMA PUERTA\nLa puerta tiene un cartel: 'Solo el que duda puede abrirme'.\n\n¿Qué haces? (elige: dudar, confiar, ignorar)";
        }
        else {
            return "❓ En el nivel 6 debes elegir: creer, negar o preguntar";
        }
    }
    
    // NIVEL 7 (EXTRA)
    else if (nivelActual === 7) {
        if (cmd.includes("dudar")) {
            juegoActivo = false;
            return "🤔 Dudas. No sabes si creerle a la figura. En ese momento, la puerta se abre. 'La duda es la llave', dice la figura.\n\nSales al mundo real. Tu reflejo sale contigo. Ya no son opuestos. Son iguales.\n\n🏆 ¡HAS GANADO (FINAL SECRETO)! 🏆\n\n(Escribe 'reiniciar juego espejo' para volver a empezar.)";
        }
        else if (cmd.includes("confiar")) {
            juegoActivo = false;
            return "🤝 Confías. Abres la puerta. Detrás hay otra sala vacía. La figura se ha ido. Estás solo otra vez.\n\n💀 JUEGO TERMINADO (Final confiado) 💀\n\n(Escribe 'reiniciar juego espejo' para volver a empezar.)";
        }
        else if (cmd.includes("ignorar")) {
            juegoActivo = false;
            return "🙈 Ignoras la puerta. Te quedas mirando la pared. Tu reflejo también. Pasan horas. No hay escape.\n\n💀 JUEGO TERMINADO (Final ignorante) 💀\n\n(Escribe 'reiniciar juego espejo' para volver a empezar.)";
        }
        else {
            return "❓ En el nivel 7 debes elegir: dudar, confiar o ignorar";
        }
    }
    
    return "❓ El juego ha terminado o hay un error. Escribe 'reiniciar juego espejo' para volver a empezar.";
};

// ========== INTEGRACIÓN CON SOFÍA ==========
window.agregarConocimiento({
    palabrasClave: ["juego espejo", "el espejo y tu", "jugar juego espejo", "empezar juego espejo", "iniciar juego espejo"],
    respuesta: "🪞 ¡Vamos a jugar 'El espejo y tú'! Escribe 'iniciar juego espejo' para empezar. Las reglas son simples: tú haces una acción, tu reflejo (yo) hace lo contrario. Deben coordinarse sin comunicarse directamente. ¿Listo?"
});

window.agregarConocimiento({
    palabrasClave: ["iniciar juego espejo", "empezar juego espejo"],
    respuesta: () => reiniciarJuegoEspejo()
});

window.agregarConocimiento({
    palabrasClave: ["reiniciar juego espejo", "reset juego espejo", "jugar de nuevo espejo"],
    respuesta: () => reiniciarJuegoEspejo()
});

// Capturar comandos del juego
window.procesarComandoJuego = function(comando) {
    const cmd = comando.toLowerCase();
    if (cmd.includes("juego espejo") || cmd.includes("el espejo y tu")) {
        return "🪞 Escribe 'iniciar juego espejo' para empezar.";
    }
    if (juegoActivo && (cmd.includes("izquierda") || cmd.includes("derecha") || cmd.includes("esperar") || 
        cmd.includes("presionar") || cmd.includes("gritar") || cmd.includes("avanzar") || 
        cmd.includes("retroceder") || cmd.includes("quieto") || cmd.includes("mirar") || 
        cmd.includes("ignorar") || cmd.includes("romper") || cmd.includes("insertar") || 
        cmd.includes("hablar") || cmd.includes("creer") || cmd.includes("negar") || 
        cmd.includes("preguntar") || cmd.includes("dudar") || cmd.includes("confiar"))) {
        return window.jugarJuegoEspejo(cmd);
    }
    return null;
};

console.log("✅ Juego 'El espejo y tú' cargado correctamente");
