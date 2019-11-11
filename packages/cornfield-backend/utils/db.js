const MongoClient = require('mongodb').MongoClient
// DB Init

const client = new MongoClient(
  process.env.NODE_ENV == 'development'
    ? 'mongodb://localhost:27017/admin'
    : `mongodb://admin:${process.env.MONGODB_PASS}@${process.env.MONGODB_IP}:27017/admin?authMechanism=DEFAULT`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

const connect = client.connect().catch((err) => {
  console.log('ERR when connect to Database')
  console.log(err)
  process.exit(1)
})

const userDBConnector = connect.then(() =>
  client.db('cornfield').collection('userdb')
)
const cvDBConnector = connect.then(() =>
  client.db('cornfield').collection('cvdb')
)
const auDBConnector = connect.then(() =>
  client.db('cornfield').collection('audb')
)
const gaDBConnector = connect.then(() =>
  client.db('cornfield').collection('gadb')
)
const flDBConnector = connect.then(() =>
  client.db('cornfield').collection('fldb')
)

module.exports = {
  userDBConnector,
  cvDBConnector,
  auDBConnector,
  gaDBConnector,
  flDBConnector
}
