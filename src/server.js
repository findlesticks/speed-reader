import React from 'react';
import ReactDOMServer from 'react-dom/server';
import HelloWorld from './components/HelloWorld';
import express from 'express';
import axios from 'axios';
import xmlToJson from 'sd-xml-parser';

let app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the 'public' folder
app.use(express.static('public'));

// GET /
app.get('/pii/:pii', function (req, res) {
  const { pii } = req.params;
  const abstractUrl = `http://www.local.sdfe.sciencedirect.com:9090/pcp/5042/article/${pii}/abstract`;
  const bodyUrl = `http://www.local.sdfe.sciencedirect.com:9090/pcp/5042/article/${pii}/body`;
  const abstractsPromise = axios(abstractUrl);
  const bodyPromise = axios(bodyUrl);
  return Promise.all([abstractsPromise, bodyPromise])
    .then(results => results.map(res => res.data))
    .then(data => Promise.all(data.map(xmlToJson)))
    .then((jsons) => {
      res.render('layout', {
        content: ReactDOMServer.renderToString(<HelloWorld />),
        jsonData: JSON.stringify(jsons),
      });
    }).catch(console.log);
});

// Start server
let server = app.listen(1337, function () {
  let host = server.address().address;
  let port = server.address().port;

  if (host === '::') {
    host = 'localhost';
  }

  console.log('Example app listening at http://%s:%s', host, port);
});
