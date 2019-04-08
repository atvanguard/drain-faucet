var Wallet = require('ethereumjs-wallet');
var request = require('request');
const fs = require('fs')

function beg(address) {
  return new Promise((resolve, reject) => {
    var options = {
      url: 'https://faucet.metamask.io/',
      headers: {
        'origin': 'https://faucet.metamask.io',
        // 'accept-encoding': 'gzip, deflate, br',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
        'content-type': 'application/rawdata',
        'accept': '*/*',
        'referer': 'https://faucet.metamask.io/',
        'authority': 'faucet.metamask.io'
      },
      body: address
    };

    request.post(options, function (error, response, body) {
      if (error) console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.

      resolve();
    });
  })
}

async function main() {
  const wallet = Wallet.generate();
  let s = `${wallet.getPrivateKeyString()}, ${wallet.getAddressString()}\n`
  console.log(s)
  fs.appendFileSync('./keys', s);
  for(let i = 0; i < 4; i++) {
    await beg(wallet.getAddressString())
  }
}

function main2() {
  setInterval(main, 10000);
}

main2()
