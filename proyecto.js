// 1- Depositar dinero
// 2-Determinar el numero de lineas que va a apostar
// 3-Ver el monto total de la apuesta
// 4-Girar la maquina tragamonedas
// 5-Verificar si el usuario ganó
// 6-Si gana el usuario darle su correspondiente dinero
// 7-Volver a jugar

// Variable para ingreso del usuario
const prompt = require("prompt-sync")();

const FILAS = 3;
const COLUMNAS = 3;

const cantSimbolos = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const valorSimbolos = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposito = () => {
  while (true) {
    const dineroDepositado = prompt("Ingrese el dinero a depositar: ");
    const numeroDineroDepositado = parseFloat(dineroDepositado);

    if (isNaN(dineroDepositado) || dineroDepositado <= 0) {
      console.log(
        "El monto ingresado es incorrecto, por favor ingrese otro monto"
      );
    } else {
      return numeroDineroDepositado;
    }
  }
};

const IngresoDeNumeroDeLineas = () => {
  while (true) {
    const linea = prompt("Ingrese el numero de linea a apostar(entre 1 y 3): ");
    const numeroDeLinea = parseFloat(linea);

    if (isNaN(numeroDeLinea) || numeroDeLinea <= 0 || numeroDeLinea > 3) {
      console.log(
        "El numero de linea ingresado es incorrecto, por favor ingrese otra linea"
      );
    } else {
      return numeroDeLinea;
    }
  }
};

const verApuesta = (dineroDepositado, linea) => {
  while (true) {
    const apuesta = prompt("Ingrese el total de la apuesta por linea: ");
    const totalApuesta = parseFloat(apuesta);

    if (
      isNaN(totalApuesta) ||
      totalApuesta <= 0 ||
      totalApuesta > dineroDepositado / linea
    ) {
      console.log(
        "La apuesta es incorrecta, ingrese nuevamente el total a apostar"
      );
    } else {
      return totalApuesta;
    }
  }
};

const girar = () => {
  const simbolos = [];
  for (const [simb, cant] of Object.entries(cantSimbolos)) {
    for (let i = 0; i < cant; i++) {
      simbolos.push(simb);
    }
  }

  const reels = [];
  for (let i = 0; i < COLUMNAS; i++) {
    //i = o => 1 objetos

    reels.push([]);
    const reelSimbolos = [...simbolos];
    for (let j = 0; j < FILAS; j++) {
      const indiceAleatorio = Math.floor(Math.random() * reelSimbolos.length);
      const seleccionSimbolo = reelSimbolos[indiceAleatorio];
      reels[i].push(seleccionSimbolo);
      reelSimbolos.splice(indiceAleatorio, 1);
    }
  }
  return reels;
};

const transponerReels = (reels) => {
  const filas = [];
  for (let i = 0; i < FILAS; i++) {
    filas.push([]);
    for (let j = 0; j < COLUMNAS; j++) {
      filas[i].push(reels[j][i]);
    }
  }

  return filas;
};

const mostrarFilas = (filas) => {
  for (const fila of filas) {
    let filaString = "";
    for (const [i, simbolo] of fila.entries()) {
      filaString += simbolo;
      if (i != fila.length - 1) {
        filaString += " | ";
      }
    }
    console.log(filaString);
  }
};

const verGanancia = (filas, apuesta, linea) => {
  let ganancia = 0;

  for (let fila = 0; fila < linea; fila++) {
    const simbolos = filas[fila];
    let todosIguales = true;

    for (const simbolo of simbolos) {
      if (simbolo != simbolos[0]) {
        todosIguales = false;
        break;
      }
    }

    if (todosIguales) {
      ganancia += apuesta * valorSimbolos[simbolos[0]];
    }
  }
  return ganancia;
};

const juego = () => {
  let dineroDepositado = deposito();

  while (true) {
    console.log("Su saldo es: $" + dineroDepositado);
    const lineaIngresada = IngresoDeNumeroDeLineas();
    const apuesta = verApuesta(dineroDepositado, lineaIngresada);
    dineroDepositado -= apuesta * lineaIngresada;
    const reels = girar();
    const filas = transponerReels(reels);
    mostrarFilas(filas);
    const ganancia = verGanancia(filas, apuesta, lineaIngresada);
    dineroDepositado += ganancia;
    console.log("Ganaste $" + ganancia.toString());

    if(dineroDepositado <= 0){
      console.log("Su saldo es insuficiente");
      break
    }

    const jugarDeNuevo = prompt("Quieres jugar de nuevo (S/N)? ")
      if(jugarDeNuevo != "S") break
  }
};

juego();
