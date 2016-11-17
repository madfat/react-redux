import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import http from 'http';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

//app.use(express.static(__dirname));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  console.log(__dirname);
  res.sendFile(path.join(__dirname,'../index.html'));
});

app.get('../sw.js', function(req, res) { 
  if(path.extname('sw.js') == '.js'){ 
    res.setHeader('content-type', 'application/javascript'); 
  } 
  res.sendFile(path.join(__dirname, '../sw.js')); 
});

// app.listen(port, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     open(`http://localhost:${port}`);
//   }
// });

const httpServer = http.createServer(app);
httpServer.listen(port);