import { MongoClient } from 'mongodb';

export const getDb = async () => {
  const client = await MongoClient.connect('mongodb://localhost/mongodb');
  return client.db();
};
