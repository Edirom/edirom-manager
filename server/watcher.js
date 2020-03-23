const chokidar = require('chokidar')
const fileType = require('file-type')
const fs = require('fs')
const DOMParser = require('xmldom').DOMParser
const xpath = require('xpath')
const filesize = require('filesize')

const meiNamespace = 'http://www.music-encoding.org/ns/mei'
const teiNamespace = 'http://www.tei-c.org/ns/1.0'
const svgNamespace = 'http://www.w3.org/2000/svg'

const getFileType = async (path) => {
  return fileType.fromFile(path)
}

// gather information about various file types
const getFileInfo = async (path, ext, stats, repo) => {
  let fileInfo = { ext, path, short: path.substr((repo.length + 1)) }
  if (typeof stats === 'object') {
    fileInfo['size'] = (typeof stats.size !== 'undefined') ? filesize(stats.size) : ''
    fileInfo['modified'] = (typeof stats.mtime !== 'undefined') ? stats.mtime : ''
  } else {
    fileInfo['size'] = ''
    fileInfo['modified'] = ''
  }

  if (ext === 'xml') {
    let data = await fs.promises.readFile(path, 'utf8')

    let doc = new DOMParser().parseFromString(data, 'text/xml')
    let ns = doc.documentElement.namespaceURI
    let root = doc.documentElement.localName

    fileInfo['ns'] = ns
    fileInfo['root'] = root

    // retrieve properties of an MEI file
    if (ns === meiNamespace) {
      fileInfo['category'] = 'MEI'

      let select = xpath.useNamespaces({ 'mei': meiNamespace })
      let surfaces = select('//mei:surface', doc)
      let measures = select('//mei:measure', doc)
      let mdivs = select('//mei:mdiv', doc)
      let measureZones = select('//mei:zone[@type="measure"]', doc)
      let music = select('//mei:note', doc) // todo: look for neumes
      fileInfo['pages'] = surfaces.length
      fileInfo['mdivs'] = mdivs.length // todo: return mdiv/@label instead
      fileInfo['measures'] = measures.length
      fileInfo['zones'] = measureZones.length
      fileInfo['music'] = (music.length > 0)
    // retrieve properties of a TEI file
    } else if (ns === teiNamespace) {
      fileInfo['category'] = 'TEI'

      let select = xpath.useNamespaces({ 'tei': teiNamespace })
      let schemaSpec = select('//tei:text/tei:body/tei:schemaSpec', doc)
      let facsimiles = select('//tei:surface', doc)
      fileInfo['odd'] = (schemaSpec.length > 0)
      fileInfo['facs'] = (facsimiles.length > 0)
    // retrieve properties of an SVG file
    } else if (ns === svgNamespace) {
      fileInfo['category'] = 'SVG'
    // retrieve properties of an arbitrary XML file
    } else {
      fileInfo['category'] = 'other'
    }
  } else if (ext === 'jpg' || ext === 'png' || ext === 'tiff' || ext === 'jpeg' || ext === 'tif') {
    fileInfo['category'] = 'img'
    // get dimensions?
  } else {
    fileInfo['category'] = 'other'
  }

  return new Promise((resolve, reject) => {
    resolve(fileInfo)
  })
}

let repos = {}

// handles changes detected to any of the files
let handleFile = (repo, path, stats, operation, socket, dataStore) => {
  // ignore .DS_Store
  if (path.endsWith('.DS_Store')) {
    return false
  }

  if (operation === 'delete') {
    dataStore.removeFile(repo, path)

    // tweet info that things have changed
    try {
      // console.log('sending fileChange message')
      socket.emit('fileChange', { repo, path, operation })
    } catch (err) {
      // console.log('socket not working properly on delete: ' + err)
    }
  } else {
    getFileType(path).then((type) => {
      // fix missing file types
      if (typeof type !== 'object') {
        if (path.endsWith('.md')) {
          type = { ext: 'md' }
        } else if (path.endsWith('.txt')) {
          type = { ext: 'txt' }
        } else {
          type = { ext: 'unknown' }
        }
      }

      getFileInfo(path, type.ext, stats, repo).then((fileInfo) => {
        // added file will be stored in the dataStore
        if (operation === 'add') {
          dataStore.addFile(repo, path, fileInfo)
        }

        // tweet info that things have changed
        try {
          // console.log('sending fileChange message')
          socket.emit('fileChange', { repo, path, operation, file: fileInfo })
        } catch (err) {
          // console.log('socket not working properly' + err)
        }
      })
    })
  }
}

// eslint-disable-next-line no-unused-vars
let watch = (repo, io, dataStore) => {
  // avoid duplicate listeners for a given folder
  if (!(repo in repos)) {
    io.on('connection', function (socket) {
      let watcher = chokidar.watch(repo, {
        ignored: /(^|[\\])\../, // ignore dotfiles
        persistent: true
      })
      watcher
        .on('add', (path, stats) => {
          console.log('adding file ' + path)
          handleFile(repo, path, stats, 'add', socket, dataStore)
        })
        .on('change', (path, stats) => {
          handleFile(repo, path, stats, 'change', socket, dataStore)
        })
        .on('unlink', path => {
          handleFile(repo, path, null, 'delete', socket, dataStore)
        })

      // More possible events.
      /* watcher
        .on('addDir', path => log(`Directory ${path} has been added`))
        .on('unlinkDir', path => log(`Directory ${path} has been removed`))
        .on('error', error => log(`Watcher error: ${error}`)) */
      /* .on('raw', (event, path, details) => { // internal
          log('Raw event info:', event, path, details)
        }) */
    })
  }
}

module.exports = { watch }
