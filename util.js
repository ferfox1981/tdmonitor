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
    
    if(vlAntigo && vlNovo) {
        const diff = (((+vlNovo.replace(",", ".")/vlAntigo.replace(",", ".")) - 1) * 100).toFixed(2);
        return diff === '0.00' ? ' (=)' : ' ('+ diff.toString().replace(".", ",") +')';
    } else 
        return '(N/A)'
}

exports.atualizarPercentual = function (antigo, novo){

    if(antigo.ipca2026 && novo.ipca2026){
        difIpca2026 = gerarDiferencaPercentual(antigo.ipca2026,novo.ipca2026);
    } 

}