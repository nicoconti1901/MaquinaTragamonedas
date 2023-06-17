// 1- Depositar dinero
// 2-Determinar el numero de lineas que va a apostar
// 3-Ver el monto total de la apuesta
// 4-Girar la maquina tragamonedas
// 5-Verificar si el usuario ganó
// 6-Si gana el usuario darle su correspondiente dinero
// 7-Volver a jugar

const prompt = require("prompt-sync")();

const deposito = () => {
    while(true){
  const dineroDepositado = prompt("Ingrese el dinero a depositar: ");
  const numeroDineroDepositado = parseFloat(dineroDepositado);

  if (isNaN(dineroDepositado) || dineroDepositado <= 0) {
    console.log(
      "El monto ingresado es incorrecto, por favor ingrese otro monto"
    );
  }else{
    return numeroDineroDepositado
  }
};
}

dineroDepositado = deposito();
console.log(dineroDepositado);
