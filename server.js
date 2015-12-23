import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';
import http from 'http';
import Immutable from 'immutable';
import patch from 'immutablepatch';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
const server = http.Server(app);

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
let todos = Immutable.fromJS([]);
let router = express.Router();

router.get('/todos', function(req, res) {
  const data = {
    data: todos.toJS()
  };
  res.json(data);
});

router.post('/todos', function(req, res) {
  const diffs = Immutable.fromJS(req.body.diffs);
  todos = patch(todos, diffs);
  return res.status(204).send();
});

app.use('/api/v1', router);

// Catch all
app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

server.listen(port, 'localhost', function onStart(err) {
  if (err) {
    console.error(err);
  }
  console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
