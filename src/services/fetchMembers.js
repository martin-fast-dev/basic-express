import { MongoClient, ObjectId } from 'mongodb';
import Debug from "debug";

const debug = Debug('app:membersService');

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

export default fetchMembers;
