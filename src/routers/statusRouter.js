import express from 'express';
import { editMemberData, fetchMembers } from '../services/membersService.js'

const statusRouter = express.Router();

statusRouter.route('/').get((req, res) => {
  (async function editMember(){
    const members = await fetchMembers();
    res.render('status', { members });
  }());
});

statusRouter.route('/').post((req, res) => {
  const { id, hearts } = req.body;
  const data = {
    hearts: Number(hearts) + 1,
  };

  (async function editMember(){
    await editMemberData(id, data);
    res.redirect('/status');
  }());
});

export default statusRouter;