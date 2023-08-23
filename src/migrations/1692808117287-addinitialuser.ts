import { getDb } from '../migrations-utils/database-connection';
import * as bcrypt from 'bcrypt';

export const up = async () => {
  const db = await getDb();
  const saltOrRounds = 10;
  const hash = await bcrypt.hash("Admin123", saltOrRounds);
  await db.collection('user').insertOne({
      username: 'admin',
      password: hash,
  })
};

export const down = async () => {
  const db = await getDb();
  /*
      Code you downgrade script here!
   */
};
