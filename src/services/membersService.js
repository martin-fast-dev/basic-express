import { MongoClient, ObjectId } from 'mongodb';
import Debug from "debug";

const debug = Debug('app:membersService');
const defaultMember = {
  username: '',
  avatar: '',
  hearts: 0,
  stars: 0,
  wallet: 0,
  skulls: 0
};

const fetchMembers = async (id) => {
  const url = 'mongodb+srv://dbUser:RGG9fQ26X2AZai7@hobbycluster.vqgyj.mongodb.net?retryWrites=true&w=majority';
  const dbName = 'hobby';
  let client;

  try {
    client = await MongoClient.connect(url);
    debug('Connected to MongoDB');

    const db = client.db(dbName);

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
  const url = 'mongodb+srv://dbUser:RGG9fQ26X2AZai7@hobbycluster.vqgyj.mongodb.net?retryWrites=true&w=majority';
  const dbName = 'hobby';
  let client;

  try {
    client = await MongoClient.connect(url);
    const db = client.db(dbName);

    console.log('info: ', {...info});
    const { id } = info;

    const objId = id ? ObjectId(id) : new ObjectId();

    const filter = {_id: objId};
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };
    const updateDoc = {
      $set: {...defaultMember, ...info},
    };

    const result = await db.collection('members').updateOne(filter, updateDoc, options);

    debug(result);

  } catch(error) {
    debug(error);
  }
  client.close();
}

const editMemberData = async (id, data) => {
  const url = 'mongodb+srv://dbUser:RGG9fQ26X2AZai7@hobbycluster.vqgyj.mongodb.net?retryWrites=true&w=majority';
  const dbName = 'hobby';
  let client;

  try {
    client = await MongoClient.connect(url);
    const db = client.db(dbName);
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
