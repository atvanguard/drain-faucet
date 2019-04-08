const fs = require('fs')
const Web3 = require('web3')
const Tx = require('ethereumjs-tx')
readline = require('readline');

const web3 = new Web3('https://ropsten.infura.io/v3/4c28f61dc1fc4120b5b5ecb1d77aac2e')

function main() {
  const to = process.argv[2]
  console.log('sending funds to ', to)

  var rd = readline.createInterface({
      input: fs.createReadStream('./keys'),
      // output: process.stdout,
      console: false
  });

  rd.on('line', async function(line) {
    line = line.split(', ')
    // console.log(line)
    let bal = await web3.eth.getBalance(line[1]);
    bal = parseInt(bal)
    if (bal > 0) {
      console.log(bal)
      const rawTx = {
        nonce: '0x00',
        from: line[1],
        to,
        value: parseInt(bal) - 10000000000 * 21000,
        gasPrice: 10000000000,
        gas: 21000
      }
      const privateKey = new Buffer(line[0].slice(2), 'hex')

      const tx = new Tx(rawTx);
      tx.sign(privateKey);
      const serializedTx = tx.serialize();
      web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
      .on('receipt', console.log);
    }
  });
}

main()
