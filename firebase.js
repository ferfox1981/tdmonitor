const fs = require('firebase-admin');
// https://retool.com/blog/crud-with-cloud-firestore-using-the-nodejs-sdk/
// https://console.firebase.google.com/u/0/project/tdmonitor-1b233/settings/serviceaccounts/adminsdk?hl=pt

const serviceAccount = {
    "type": "service_account", 
    "project_id": "tesouro-monitor",
    "private_key_id": process.env.FIREBASE_PROJECT_KEY_ID,
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+c+KhEvOlXvvZ\nuHS5MmcVehTkXctiQD6wWBxy27S2ns+nu6BSSicMyuKtEXALEVCuyDmeaCkUeleB\nJdPL5vnz+bRrFBvLhmFH96yzc6UwwQBma6cO8SxQ3OLENSkAH7gBWaPkaqwYAi0a\nQuimZk7eXzI17MBGbprYoJ3wE1mwug2Nt1Z4xuLhep7h3MvrhL3ABs9A+QMrYMNj\noh7HBxwyDi/9PgieCPyTzOzc3+rik8/aEauz9XzQ8STw9iiNAns/5YTRgBCTMvWY\nx/gsCJz8qr8eHnk2m6I9TCpc+J/WlbJsn8Yf4csUT/ZfFe8uHLDeVVGWsdwzi+j7\nxuWxCuOZAgMBAAECggEAPS5DBlVtOZmatCVCMeAUJ10Raw8Kb+SNft6/PNKBagz4\nTjzC0syJYN2oFcq9QIDud0dQ4yc40yA+DfnV4PGxKAP2RlOuXiIsDA9vRjKHRXMq\nqrw4bV9iShO7MSaWpjiKRrzCHnV6FThVvtLxo8rH2T2hhpsoZTfQvHhUZDQDIvcC\nbpp+kPa8EcHjK+Wz7DOM0/f11QzGxy0Hv+uJnFceAOd4e8ISqMgYG6L7f76wdLKD\nyj9n+FToCL2YkkjqF7B5iAAcY9U6JVQaEYKaEgquiZQyadgC2yiRgEDsncMCCwFg\nn9Cj3BSAo+Q4zWziMtR6TbLPKl9rZIPSBDrLNkMdlQKBgQD+OzQXGkzOQE7aJRBj\nobfSwoKisLqJlaVGxhTQUTKw2mKLN2V2VQJyQbJ/1IpMZ13Vy6TW5aEsig6IhbQw\n8TREmVo63UqWxZvmSerRrInuY2Of3qAGUqXidY2g2rsxkN3QXpSn3AROf4LLagno\nCGZZpePFBZib4TGQFBH1T7YfewKBgQC/xxbm2jYSC7QRhFqw9NJ2YkAkeiFRX4CG\nXkG9No20uf0fJWpG7s2MeezpAUFSasiIY7lAvUuEgenOSad/Me99/HtOYXs8m7hD\nat8yxYatFndPt2iZ7vi4Y6bjUAZM922wQhik1CYYnGDv8BoNf4phpsSXBaGERXke\nA7/ju7wy+wKBgQDLPTkfXv8Xw4FGE2tOuvHho24b8XyukNtYAPKSttb3Wx58fQS3\n3K3f+XVhi+AjxF7Xk71rrpdyq8uCiKDMn4dRb+caN95xOfiv2VfH109NLFdwbuEv\nLNNAfwmCFlqf/VfWREZDCzjGKFm/lD3nKQ/pixzTXO3rb9PXgrP4kIjgEQKBgE4l\nQSbGijvmOvTcWtw6lrwYowx6G7N91/Bo3h7M6QdYtlUHuPu4eVehozD7CvQbgSVa\nhXVk7S3MhkpB5xfEcFOFG3W/8SisR3RpSxP0O0GyouF/2gbHwt/X83wy8q5QMIkf\nFc2siO2EY1fCHcucSfYqr3bem4c7i/P4ESwqJrEbAoGAViKGMemsdaaiuOW3hTHW\nVMWPPPfuU6okKfSBbPWPfKofrYEYTFKXwrgIjkcxVz9qmk+EsUPHqOnKiX/LHDzd\nVGvSL7w/7JCPyAUsUdgy02+I52YZfkkenLuMNWG563fK3pekYADECTbc9SlHwU7i\nbjRGfvguBTjD3BFYwAoHBCI=\n-----END PRIVATE KEY-----\n",
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