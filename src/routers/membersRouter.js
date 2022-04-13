import express from 'express';
import Debug from "debug";
import { MongoClient } from 'mongodb';
import fetchMembers from '../services/fetchMembers.js'

const debug = Debug('app:membersRouter');
const membersRouter = express.Router();
const defaultMember = {
  username: '',
  avatar: '',
  hearts: 0,
  stars: 0,
  wallet: 0,
  skulls: 0
};

membersRouter.route('/').get((req, res) => {
  (async function getMembers(){
    const members = await fetchMembers();
    res.render('members', { members });
  }());
});

membersRouter.route('/:id').get((req, res) => {
  (async function getMember(){
    const id = req.params.id;
    const member = await fetchMembers(id);
    res.render('member', { member });
  }());
});

membersRouter.route('/save-member').post((req, res) => {
  const { username } = req.body;
  const url = 'mongodb+srv://dbUser:RGG9fQ26X2AZai7@hobbycluster.vqgyj.mongodb.net?retryWrites=true&w=majority';
  const dbName = 'hobby';

  (async function addMember(){
    let client;
    try {
      client = await MongoClient.connect(url);

      const db = client.db(dbName);
      const member = {...defaultMember, username};

      const result = await db.collection('members').insertOne(member);
      debug(result);

      res.redirect('/members');

    } catch(error) {
      debug(error);
    }
    client.close();
  }())
});

export default membersRouter;