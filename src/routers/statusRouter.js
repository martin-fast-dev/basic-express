import express from 'express';
import { editMemberData, fetchMembers } from '../services/membersService.js'

const statusRouter = express.Router();

statusRouter.route('/').get((req, res) => {
  (async function editMember(){
    const members = await fetchMembers();
    res.render('status', { members });
  }());
});

statusRouter.route('/add').post((req, res) => {
  const { id, hearts, route } = req.body;
  const data = {
    hearts: Number(hearts) + 1,
  };

  (async function editMember(){
    await editMemberData(id, data);
    res.redirect(route);
  }());
});

statusRouter.route('/remove').post((req, res) => {
  const { id, hearts, route } = req.body;
  const data = {
    hearts: Number(hearts) - 1,
  };

  (async function editMember(){
    await editMemberData(id, data);
    res.redirect(route);
  }());
});

statusRouter.route('/delete-all').post((req, res) => {
  const { id, route } = req.body;
  const data = {
    hearts: 0,
  };

  (async function editMember(){
    await editMemberData(id, data);
    res.redirect(route);
  }());
});


export default statusRouter;