import { MongoClient, ObjectId } from 'mongodb';
import Debug from "debug";

const debug = Debug('app:membersService');
const DBURL = process.env.DBURL;
const DBNAME = process.env.DBNAME;

const fetchMembers = async (id) => {
  let client;

  try {
    client = await MongoClient.connect(DBURL);
    debug('Connected to MongoDB');
    const db = client.db(DBNAME);

    if (id) {
      return await db.collection('members').findOne({_id: new ObjectId(id)});
    } else {
      return await db.collection('members').find().toArray();
    }
  } catch (error) {
    debug('ERROR', error.stack);
  }
  client.close();
}

const saveMember = async (info) => {
  let client;

  try {
    client = await MongoClient.connect(DBURL);
    const db = client.db(DBNAME);

    console.log('info: ', {...info});
    const { id } = info;

    const objId = id ? ObjectId(id) : new ObjectId();

    const filter = {_id: objId};
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };
    const updateDoc = {
      $set: {...info},
    };

    const result = await db.collection('members').updateOne(filter, updateDoc, options);

    debug(result);

  } catch(error) {
    debug(error);
  }
  client.close();
}

const editMemberData = async (id, data) => {
  let client;

  try {
    client = await MongoClient.connect(DBURL);
    const db = client.db(DBNAME);
    const filter = {_id: ObjectId(id)};
    const updateDoc = {
      $set: {...data},
    };

    const result = await db.collection('members').updateOne(filter, updateDoc);

    debug(result);

  } catch(error) {
    debug(error);
  }
  client.close();
}

export { fetchMembers, saveMember, editMemberData };
