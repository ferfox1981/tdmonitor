const util = require('./util.js')

antigo =  {
    statusMercado: 'Fechado',
    ipca2026: '5,55',
    ipca2035: '5,75',
    ipca2045: '5,75',
    ipca2025Pre: '12,63',
    ipca2029Pre: '12,65'
   }

novo =  {
    statusMercado: 'Fechado',
    ipca2026: '5,56',
    ipca2035: '10',
    ipca2045: '4',
    ipca2025Pre: '12,63',
    ipca2029Pre: '12,65'
   }   

 
console.log(antigo.ipca2026)
console.log(util.gerarDiferencaPercentual(novo.ipca2026, antigo.ipca2026))