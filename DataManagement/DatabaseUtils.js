import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

const tableName = 'quest_log';

export const getDBConnection = () => {
  return openDatabase({ name: 'quest_system.db', location: 'default' });
};

export const createTableIfNotExists = (db) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, quest_data TEXT);`;

  db.executeSql(query);
};

export const loadQuestsFromDatabase = (db) => {
  try {
    const quests = [];
    const results = db.executeSql(`SELECT rowid as id,value FROM ${tableName}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        quests.push(result.rows.item(index))
      }
    });
    return quests;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get quests!');
  }
};

export const saveTodoItems = (db, todoItems) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    todoItems.map(i => `(${i.id}, '${i.value}')`).join(',');

  return db.executeSql(insertQuery);
};

export const deleteTodoItem = (db, id) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  db.executeSql(deleteQuery);
};

export const deleteTable = (db) => {
  const query = `drop table ${tableName}`;

  db.executeSql(query);
};