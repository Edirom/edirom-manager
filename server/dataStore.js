let files = {}
const addFile = (repo, path, fileInfo) => {
  if (repo in files) {
    let rep = files[repo]
    rep[path] = fileInfo
  } else {
    let rep = files[repo] = {}
    rep[path] = fileInfo
  }
}
const removeFile = (repo, path) => {
  if (repo in files) {
    let rep = files[repo]
    try {
      delete rep.path
    } catch (err) {
      // console.log('Unable to remove file: ' + err)
    }
  }
}

module.exports = { files, addFile, removeFile }
