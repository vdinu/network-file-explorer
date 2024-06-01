const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
//const localPath = path.resolve(__dirname, '..', 'build');
const localPath = "D:\\";
console.log('localPath:', localPath);
app.use('/static', express.static(localPath));

// Always return the main index.html, so react-router render the route in the client
app.get('/files/*', (req, res) => {
  // read list of files metadata from local path
  // parse request url from req
  const url = req.url;
  console.log('url:', url);
  const requestFolder = url.replace('/files', '');
  const files = fs.readdirSync(path.resolve(localPath, requestFolder));
  // for loop to print all files
  const stats = [];
  for (const file of files) {
    // get file stats
    const fileStat = fs.statSync(path.resolve(localPath, requestFolder, file));
    stats.push({
      name: file,
      size: fileStat.size,
      createdTime: fileStat.birthtime,
      updatedTime: fileStat.mtime,
      isDirectory: fileStat.isDirectory(),
    });
  }
  return res.json(stats);
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
