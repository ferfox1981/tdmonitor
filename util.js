_ = require("lodash")


exports.comparaDiferenca = function (antigo, novo){
    if (antigo && novo)
        if(_.isEqual(antigo,novo))
            return true;
        else
            return false;
    else
        return false;
}


exports.gerarDiferencaPercentual = function (vlAntigo, vlNovo){
    
    if(vlAntigo && vlNovo)
    return (((+vlNovo.replace(",", ".")/vlAntigo.replace(",", ".")) - 1) * 100).toFixed(2);
}

exports.atualizarPercentual = function (antigo, novo){

    if(antigo.ipca2026 && novo.ipca2026){
        difIpca2026 = gerarDiferencaPercentual(antigo.ipca2026,novo.ipca2026);
    } else {
        
    }

}