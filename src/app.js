const IPFS = require('ipfs-http-client');

function repo() {
  return 'yjs-demo/' + Math.random();
}

const ipfs = IPFS.create({
  host: 'localhost',
  port: '5002', 
  protocol: 'http',
  repo: repo(), 
});

console.log('Before calling ipfs.id()');

ipfs.id()
  .then((info) => {
    console.log('IPFS node ready with address ' + info.id);
  })
  .catch((err) => {
    console.error('Error while getting IPFS node ID:', err);
  });

console.log('After calling ipfs.id()');
