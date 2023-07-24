const IPFS = require('ipfs');
const Y = require('yjs')
console.log(Y.utils);
require('y-memory')(Y)
require('y-array')(Y)
require('y-text')(Y)
require('y-ipfs-connector')(Y)

function repo() {
  return 'yjs-demo/' + Math.random();
}

const ipfs = IPFS.create({
  host: 'localhost',
  port: '5002', 
  protocol: 'http',
  repo: repo(), 
  EXPERIMENTAL: {
    pubsub: true
  }
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

ipfs.once('ready', () => ipfs.id((err, info) => {
  if (err) { throw err }

  console.log('IPFS node ready with address ' + info.id)

  Y({
    db: {
      name: 'memory'
    },
    connector: {
      name: 'ipfs',
      room: 'ipfs-yjs-demo',
      ipfs: ipfs
    },
    share: {
      textfield: 'Text'
    }
  }).then((y) => {
    y.share.textfield.bind(document.getElementById('textfield'))
  })
}))