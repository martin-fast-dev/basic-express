import express from 'express';
import Debug from "debug";
import { fetchMembers, saveMember } from '../services/membersService.js'

const debug = Debug('app:membersRouter');
const membersRouter = express.Router();

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

membersRouter.route('/add').get((req, res) => {
  (async function getMember(){
    res.render('member', { member: null });
  }());
});

membersRouter.route('/save-member').post((req, res) => {
  const { username } = req.body;

  if (!username) {
    res.redirect('/members');
    return;
  }

  (async function editMember(){
    await saveMember(req.body);
    res.redirect('/members');
  }());
});

export default membersRouter;