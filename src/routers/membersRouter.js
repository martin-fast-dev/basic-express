import express from 'express';
import Debug from "debug";
import { fetchMembers, saveMember, deleteMember } from '../services/membersService.js'

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

membersRouter.route('/add').get((req, res) => {
  (async function getMember(){
    res.render('member', { member: null });
  }());
});

membersRouter.route('/save-member').post((req, res) => {
  const { id, username, avatar } = req.body;

  console.log(req.body);

  if (!username) {
    res.redirect('/members');
    return;
  }

  const data = {
    id,
    username,
  };

  if (avatar) {
    data.avatar = `/images/${avatar}`;
  }

  (async function editMember(){
    await saveMember(data);
    res.redirect(`/members/${id}`);
  }());
});

membersRouter.route('/delete-member').post((req, res) => {
  const { id } = req.body;

  if (!id) {
    res.redirect('/members');
    return;
  }

  (async function run(){
    await deleteMember(id);
    res.redirect('/members');
  }());
});

export default membersRouter;