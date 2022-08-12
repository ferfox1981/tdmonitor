const fs = require('firebase-admin');
// https://retool.com/blog/crud-with-cloud-firestore-using-the-nodejs-sdk/
// https://console.firebase.google.com/u/0/project/tdmonitor-1b233/settings/serviceaccounts/adminsdk?hl=pt

const serviceAccount = { 
    "type": "service_account", 
    "project_id": "tesouro-monitor",
    "private_key_id": process.env.FIREBASE_PROJECT_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_AUTH_URI,
    "token_uri": process.env.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER,
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509
};

fs.initializeApp({
 credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore();

exports.getElement =  async function getElement() {
    const liam = await db.collection('diario').doc('hora').get();
    return liam.data();
}

exports.setElement = async function newSet(){
    const liam = await db.collection('diario').doc('20220811').set({xxx:'SSS'});
}