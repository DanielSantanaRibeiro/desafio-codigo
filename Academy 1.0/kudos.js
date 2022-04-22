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
    return; //If is not a number return error
  //END OF VALIDATION

  const desc_kudo_to_points = KUDOS_TO_POINTS.reverse();
  let index = 0;
  let kudos_array = [];
  
  while (points > 0) {
    if (points >= desc_kudo_to_points[index].value) {
      points -= desc_kudo_to_points[index].value;
      kudos_array.push(desc_kudo_to_points[index].name);
    } else {
      index++;
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

  totals = totals > MAX_REAL_VALUE ? MAX_REAL_VALUE : totals; //Points will never be above 1m 
  console.log("Total:", totals);
  return `Você recebeu ${porExtenso(totals,ESTILO_MONETARIO)} reais em retorno aos kudos ${kudos.join(', ')} !`;
}

const arraykudo = getKudosForUser(1125);  
console.log(arraykudo);
const message = getKudosValueMessageForUser(arraykudo);
console.log(message);

module.exports = {
  getKudosForUser,
  getKudosValueMessageForUser,
};