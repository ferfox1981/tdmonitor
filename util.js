_ = require("lodash")


exports.comparaDiferenca = function (antigo, novo){
    if(_.isEqual(antigo,novo))
        console.log('sao iguais')
    else
        console.log('sao diferentes')
}