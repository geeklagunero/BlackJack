(() => {
    'use strict'
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

// let puntosJugador = 0;
// let puntosComputadora = 0;

let puntosJUgadores = [];

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasCompu = document.querySelector('#computadora-cartas');

const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();
    for(let i = 0; i < numJugadores; i++){
        puntosJUgadores.push(0);
    }
}

//turno 0 es para el primer jugador y el ultimo sera la computadora
const acumularPuntos = (carta, turno) => {

    puntosJUgadores[turno] = puntosJUgadores[turno]  + valorCarta(carta);
    puntosHTML[turno].innerText = puntosJUgadores[turno];
    return puntosJUgadores[turno];

}

const turnoComputadora = (puntosMinimos) => {

   do {
    const carta = pedirCarta();
    acumularPuntos(carta, puntosJUgadores.length - 1);
    // puntosComputadora = puntosComputadora + valorCarta(carta);
    // puntosHTML[1].innerText = puntosComputadora;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasCompu.append(imgCarta);

    if(puntosMinimos > 21){
        break;
    }


   } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

   setTimeout(() => {
    if(puntosComputadora === puntosMinimos){
        alert('nadie gana');
       } else if(puntosMinimos > 21){
        alert('Computadora gana');
       } else if(puntosComputadora > 21){
        alert('Jugador gana');
       } else {
        alert('Computadora Gana');
       }
   }, 10);
   



}

const crearDeck = () => {

    deck = [];

    for( let i = 2; i <= 10; i++ ){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }


    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }

    //console.log(deck);
    deck = _.shuffle(deck);
    //console.log(deck);
    
    return deck;
}




// esta funcion me permite tomar una carta
const pedirCarta = () => {
    if(deck.length === 0){
        throw "No hay cartas en el deck";
    }
    const carta = deck.pop();
    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? 
            (valor === 'A') ? 11 : 10
            : valor * 1;
}

//const valor = valorCarta(pedirCarta());
//console.log({valor});
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);
    // puntosJugador = puntosJugador + valorCarta(carta);
    // puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);
    
    if(puntosJugador > 21){
        console.log('LO siento perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
        
    } else if(puntosJugador === 21){
        console.log('ganaste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
        
    }

});



btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
    inicializarJuego();
    deck = [];
    deck = crearDeck();

    // puntosJugador = 0;
    // puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasCompu.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
});

})();


