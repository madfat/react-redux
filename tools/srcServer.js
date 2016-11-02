import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import https from 'https';
import http from 'http';
import fs from 'fs';

/* eslint-disable no-console */

const port = 3000;
const secure_port = 4563;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

// app.listen(port, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     open(`https://localhost:${port}`);
//   }
// });

const privateKey = fs.readFileSync('key.pem','utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const cridential = {key: privateKey, cert: certificate};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(cridential, app);

httpServer.listen(port);
httpsServer.listen(secure_port);
