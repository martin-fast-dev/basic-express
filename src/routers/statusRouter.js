import express from 'express';
import fetchMembers from '../services/fetchMembers.js'

const members = await fetchMembers();

const statusRouter = express.Router();

statusRouter.route('/').get((req, res) => {
  res.render('status', { members });
});

export default statusRouter;