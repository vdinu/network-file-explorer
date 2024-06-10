const express = require('express');
const apiFilesRouter = express.Router();
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
const localPath = path.resolve(__dirname, '..', 'build');
console.log('localPath:', localPath);
app.use('/', express.static(localPath));

function requestUrlToWindowsPath(url) {
  if (url.startsWith('/')) {
    url = url.substring(1);
  }
  var urlPath = url.split(/\//g);
  if (urlPath.length > 0 && urlPath[0].length === 1) {
    return urlPath[0].toUpperCase() + ':\\' +
        urlPath.slice(1)
          .map(pathElem => decodeURIComponent(pathElem))
          .join('\\');
  } else {
    throw new Error('Invalid url path:', url);
  }
}

apiFilesRouter.get('*', (req, res) => {
  if (req.url === '' || req.url === '/') {
    return res.json([{name: 'C', isDirectory: true}, {name: 'D', isDirectory: true}]);
  }
  // read list of files metadata from local path
  // parse request url from req
  var requestPath = requestUrlToWindowsPath(req.url);
  console.log('url:', requestPath);
  const files = fs.readdirSync(path.resolve(requestPath));
  // for loop to print all files
  const stats = [];
  for (const file of files) {
    // get file stats
    try {
      const fileStat = fs.statSync(path.resolve(requestPath, file));
      stats.push({
        name: file,
        size: fileStat.size,
        createdTime: fileStat.birthtime,
        updatedTime: fileStat.mtime,
        isDirectory: fileStat.isDirectory(),
      });
    } catch (err) {
      console.error('Error:', err);
      stats.push({
        name: file
      });
    }
  }
  return res.json(stats);
});

const PORT = process.env.PORT || 9000;

app.use('/api/files', apiFilesRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
