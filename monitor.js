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
        let restrito2035 = retorno.filter(x => x['dado']['isinCd'] === 'BRSTNCNTB3E2')
        let restrito2045 = retorno.filter(x => x['dado']['isinCd'] === 'BRSTNCNTB2U0')
        
        let taxa = 
            {ipca2035:restrito2035[0]['dado']['anulInvstmtRate'],
            ipca2045:restrito2045[0]['dado']['anulInvstmtRate']};        
        return taxa;
    });
    
}

