import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';
import http from 'http';
import Immutable from 'immutable';
import Immstruct from 'immstruct';
import patch from 'immutablepatch';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import React from 'react';
import { Provider } from 'react-redux';
import routes from './src/js/routes';
import configureStore from './src/js/store';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
const server = http.Server(app);

// app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

if (isDeveloping) {
  const compiler = webpack(config);

  app.use(webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
}

// API
const structure = Immstruct('todos', {
  todos: []
});
let todosReference = structure.reference(['todos']);
let router = express.Router();

router.get('/todos', function(req, res) {
  const data = {
    data: todosReference.cursor().deref().toJS()
  };
  res.json(data);
});

router.post('/todos', function(req, res) {
  const diffs = Immutable.fromJS(req.body.diffs);
  let cursor = todosReference.cursor();
  cursor.set(patch(cursor.deref(), diffs));
  return res.status(204).send();
});

app.use('/api/v1', router);

// Server rendering
const server_renderer = (req, res) => {
  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).render('500', { error_message: error.message });
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      let todosCursor = todosReference.cursor();
      let nextId = todosCursor.deref().reduce((prev, curr) => {
        return curr.get('id') > prev ? curr.get('id') + 1 : prev;
      }, 1);
      let initialData = {
        todos: {
          todos: todosCursor
        }
      };
      let store = configureStore(initialData);
      let output = renderToString(
        <Provider store={store}>
          <RoutingContext {...renderProps} />
        </Provider>
      );
      let initial = store.getState();
      initial.todos.nextId = nextId;
      res.status(200).render('index', { body: output, initial: JSON.stringify(initial) });
    } else {
      res.status(404).render('404');
    }
  });
};
app.use(server_renderer);

server.listen(port, 'localhost', function onStart(err) {
  if (err) {
    console.error(err);
  }
  console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
