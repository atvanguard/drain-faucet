```
git clone https://github.com/atvanguard/drain-faucet.git

npm i
node index.js
(kill the script when you start seeing: )
statusCode: 429
body: Too many requests, please try again later.
wait for a min to let the transactions be confirmed


node send.js <0x prefixed ethereum address to send the funds to>, e.g.
node send.js 0x52cbD961aA5a6146B4f75f6b21C8ba87D342EA7f
```
