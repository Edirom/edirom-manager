let watchDemon = require('./server/watcher')
let dataStore = require('./server/dataStore')

// variables
const port = 3000

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const fileStoreOptions = {}

// regular express server setup
app.use(express.static('dist'))
// set up session store
app.use(session({
  store: new FileStore(fileStoreOptions),
  secret: 'jkdalsjklasd',
  resave: true,
  saveUninitialized: true
}))

// app.get('/', (req, res) => res.send('Hello World!'))
/* app.get('/', function (req, res) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('Welcome to the file session demo. Refresh page!')
  }
}) */

io.on('connection', function (socket) {
  // console.log('established socket connection')

  // when being asked for the files of a given repo, find and return them
  socket.on('requestFiles', (data) => {
    console.log('received requestFiles')
    let repo = dataStore.files[data.repo]
    let files = []
    for (let file in repo) {
      files.push(repo[file])
    }
    socket.emit('fileListing', { repo, files })
  })

  socket.on('getFileInfo', (data) => {

  })
})

// watch directory for changes
watchDemon.watch('/Users/johannes/Repositories/data', io, dataStore)

server.listen(port, () => console.log(`Example app listening on port ${port}!`))
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
