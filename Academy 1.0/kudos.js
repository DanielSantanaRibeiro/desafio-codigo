const {porExtenso, "estilo.monetario": ESTILO_MONETARIO} = require('numero-por-extenso');

// Conversão de kudos para pontos
const KUDOS_TO_POINTS = [
  { name: 'OK', value: 5 },
  { name: 'NICE', value: 10 },
  { name: 'GOOD', value: 20 },
  { name: 'GREAT', value: 50 },
  { name: 'SUPER', value: 100 },
];

// Conversão de kudos para reais
const KUDOS_TO_REAL = [
  { name: 'OK', value: 2 },
  { name: 'NICE', value: 5 },
  { name: 'GOOD', value: 8 },
  { name: 'GREAT', value: 15 },
  { name: 'SUPER', value: 25 },
];

const MAX_REAL_VALUE = 1000000;

/* 
  Recebe: um int representando o número de pontos do usuário
  Retorna: um array contendo os kudos. Ex.: ['OK', 'GOOD'] 
*/
function getKudosForUser(points) {
  //VALIDATION
  if (isNaN(points))
    throw TypeError("Invalid Argument! Argument is not a number!"); //If is not a number throw error
  
  if(!Number.isInteger(points))
    throw TypeError("Invalid Argument! Argument must be an Integer number!"); //If is not a number return error
  //END OF VALIDATION
  
  let kudos_array = [];
  for(let index = KUDOS_TO_POINTS.length-1; points > 0 && index >= 0;){  
    if (points >= KUDOS_TO_POINTS[index].value) {
      points -= KUDOS_TO_POINTS[index].value;
      kudos_array.push(KUDOS_TO_POINTS[index].name);
    } else {
      index--;
    }
  }

  return kudos_array;
}

/* 
  Recebe: Recebe um array contendo os nomes dos kudos de um usuário. Ex.: ['OK', 'GOOD']
  Retorna: a mensagem padrão com o valor em reais dos kudos por extenso. Ex.: Parabéns, você ganhou vinte e cinco reais
*/
function getKudosValueMessageForUser(kudos) {

  let totals = KUDOS_TO_REAL.reduce((acc, current) => {
    const kudocount = kudos.filter((x) => x === current.name).length;
    return acc + (current.value * kudocount);
  }, 0);
  
  //Valor será no máximo 1 milhão e para esse caso é preciso acrescentar 'de' (Ex.: um milhão de reais);
  const literal_value = totals >= MAX_REAL_VALUE ? `${porExtenso(MAX_REAL_VALUE,ESTILO_MONETARIO)} de` : `${porExtenso(totals,ESTILO_MONETARIO)}`; 
  
  return `Você recebeu ${literal_value} reais em retorno aos kudos ${kudos.join(', ')}!`;
}

module.exports = {
  getKudosForUser,
  getKudosValueMessageForUser,
};
