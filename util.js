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