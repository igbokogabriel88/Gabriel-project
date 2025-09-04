const https = require('https');
const testAPI = (url, name) => {
    console.log(`Testing ${name}... `);
    const req = https.get(url, (res) => {
        console.log(` ${name} accessible - Status: ${res.statusCode}`);
    })
    req.on('error', (err) => {
          console.log(`${name} blocked: ${err.message}`);
    } );

    req.setTimeout(5000, () => {
        console.log(`${name} timeout`)
    });
}
testAPI('https://pinata.cloud', 'Pinata');
testAPI('https://nft.storage', 'NFT.storage');
testAPI('https://infurar.io', 'Infurar IPFS');
testAPI('https://google.com', 'Google')