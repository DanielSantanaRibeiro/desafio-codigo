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

const MAX_POINTS = 1000000;
/* 
  Recebe: um int representando o número de pontos do usuário
  Retorna: um array contendo os kudos. Ex.: ['OK', 'GOOD'] 
*/
function getKudosForUser(points) {
  //VALIDATION
  if (isNaN(points))
    return; //If is not a number return error

  if (points > MAX_POINTS)
    points = MAX_POINTS; //Points will never be above 1m 
  //END OF VALIDATION

  const desc_kudo_to_points = KUDOS_TO_POINTS.reverse();
  let index = 0;
  let kudo_array = [];

  while (points > 0) {
    if (points >= desc_kudo_to_points[index].value) {
      points -= desc_kudo_to_points[index].value;
      kudo_array.push(desc_kudo_to_points[index].name);
    } else {
      index++;
    }
  }

  return kudo_array.reverse();
}

/* 
  Recebe: Recebe um array contendo os nomes dos kudos de um usuário. Ex.: ['OK', 'GOOD']
  Retorna: a mensagem padrão com o valor em reais dos kudos por extenso. Ex.: Parabéns, você ganhou vinte e cinco reais
*/
function getKudosValueMessageForUser(kudos) { }

module.exports = {
  getKudosForUser,
  getKudosValueMessageForUser,
};