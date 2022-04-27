import express from 'express';
import Debug from 'debug';
import morgan from 'morgan';
import path from 'path';
import {fileURLToPath} from 'url';
import statusRouter from './src/routers/statusRouter.js';
import membersRouter from './src/routers/membersRouter.js';
import { editMemberData, fetchMembers } from './src/services/membersService.js'
import { WebSocketServer } from 'ws';



const PORT = process.env.PORT;
const app = express();
const wss = new WebSocketServer({ port: 8080 });


//Debug tools
const debug = Debug('app');
app.use(morgan('tiny'));



wss.on('connection', function connection(ws) {
  debug('A new client connected!');

  ws.on('message', function message(data) {
    const msg = JSON.parse(data);
    debug('received: %s', msg);
    (async function editMember(){
      const result = await editMemberData(msg.id, msg);
      console.log(result);
      ws.send(JSON.stringify({ status: result, message: msg }));
    }());
  });
});



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
