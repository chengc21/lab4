const express = require('express');
const expressVue = require('express-vue');
const path = require('path');
require('cross-fetch/polyfill');

const hostname = '127.0.0.1';
const port = 3000;

// Initialize Express
const app = express();
app.use(express.static('static'));

// Options for express-vue
const vueOptions = {
  head: {
    title: 'Harvard Art Museums',
    metas: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
    ],
    styles: [
      {
        style: '/css/styles.css'
      },
      {
        style: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
      }
    ]
  },
  rootPath: path.join(__dirname, '/views')
};


// Initialize express-vue
const expressVueMiddleware = expressVue.init(vueOptions);
let comments = {};

app.use(expressVueMiddleware);

const API_KEY = '7ad657f0-b77e-11e8-bf0e-e9322ccde4db';

// List galleries
app.get('/', (req, res) => {
  const url = `https://api.harvardartmuseums.org/gallery?size=100&apikey=${API_KEY}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    res.renderVue('index.vue', {galleries:data.records});
  });
});

// List objects
app.get('/gallery/:gallery_id', (req, res) => {
  fetch(`https://api.harvardartmuseums.org/object?apikey=${API_KEY}&gallery=${req.params.gallery_id}&size=999`)
  .then(response => response.json())
  .then(data => {
      res.renderVue('gallery.vue', {objects: data.records, gallery_id: req.params.gallery_id});
  })
});

// Show object
app.get('/object/:object_id', (req, res) => {
  fetch(`https://api.harvardartmuseums.org/object/${req.params.object_id}?apikey=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
      let object_comments = comments[req.params.object_id] ? comments[req.params.object_id] : []
      res.renderVue('details.vue', {detail: data, object_id: req.params.object_id, comments : object_comments});
  });
});


// Comment on object
app.get('/object/:object_id/comment', (req, res) => {
  if (comments[req.params.object_id]) {
      comments[req.params.object_id].push(req.params.comment);
      console.log(hi);
  } else {
      comments[req.params.object_id] = [];
      comments[req.params.object_id].push(req.params.comment);
      console.log(hi);
  }
});

// Listen on socket
app.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}/`);
});
