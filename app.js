import express from 'express';
import Debug from 'debug';
import morgan from 'morgan';
import path from 'path';
import {fileURLToPath} from 'url';
import statusRouter from './src/routers/statusRouter.js';
import membersRouter from './src/routers/membersRouter.js';

const PORT = process.env.PORT;
const app = express();

//Debug tools
const debug = Debug('app');
app.use(morgan('tiny'));

//Setting __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname + '/public'));

//ejs
app.set('views', './src/views');
app.set('view engine', 'ejs');

//For parsing/sending form
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routers
app.use('/status', statusRouter);
app.use('/members', membersRouter);

app.get('/', (req, res) => {
  res.render('index', { title: 'Välkommen' });
});

app.listen(PORT, () => {
  debug(`Listening on port ${PORT}`);
});
