const axios = require('axios');
const { exec } = require("child_process");
const https = require('https');


const instance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

module.exports = async function getTaxas() {
    return instance.get('https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json').then(x => {
        let retorno = x.data.response['TrsrBdTradgList'].map(element =>
        ({
            dado: element['TrsrBd']
        })

        )
        let mercado = x.data.response['TrsrBondMkt']
        const status = mercado['sts']
        let restrito2026 = retorno.filter(x => x['dado']['isinCd'] === 'BRSTNCNTB4W2')
        let restrito2035 = retorno.filter(x => x['dado']['isinCd'] === 'BRSTNCNTB3E2')
        let restrito2045 = retorno.filter(x => x['dado']['isinCd'] === 'BRSTNCNTB2U0')
        let restritoprefix2025 = retorno.filter(x => x['dado']['isinCd'] === 'BRSTNCLTN7N2')
        let restritoprefix2029 = retorno.filter(x => x['dado']['isinCd'] === 'BRSTNCLTN806')
        //let restritoIpcaJuros2032 = retorno.filter(x => x['dado']['isinCd'] === 'BRSTNCNTB674')
        
         

        
        let taxa = 
            {statusMercado: status,
             ipca2026:restrito2026[0]['dado']['anulInvstmtRate'].toString().replace(".", ","),
             ipca2035:restrito2035[0]['dado']['anulInvstmtRate'].toString().replace(".", ","),
             ipca2045:restrito2045[0]['dado']['anulInvstmtRate'].toString().replace(".", ","),
             ipca2025Pre:restritoprefix2025[0]['dado']['anulInvstmtRate'].toString().replace(".", ","),
             ipca2029Pre:restritoprefix2029[0]['dado']['anulInvstmtRate'].toString().replace(".", ","),
          //   ipca2032JurosSem:restritoIpcaJuros2032[0]['dado']['anulInvstmtRate'].toString().replace(".", ","),
            };        
        return taxa;
    });
    
}

