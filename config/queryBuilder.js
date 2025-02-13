/*import { dbConfig } from './dbConfig.js';

//geneirca funzione per eseguire una query qualsiasi, passando come parametri la query e i parametri a lei necessari
export function executeQuery(query, params = [], callback) {
  dbConfig.execute(query, params, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

export function buildQuery(action, table, data = {}, columns = '*', condition = '', valuesForCondition = []) {
    let query = '';
    let returningValuesForCondition = []

    switch (action) {

        case 'select':
            query = `SELECT ${columns} FROM ${table} ${condition}`;
            returningValuesForCondition = [...valuesForCondition];
            break;

        case 'insert':
            const keys = Object.keys(data).join(', ');
            query = `INSERT INTO ${table} (${keys}) VALUES (${keys.map(() => '?').join(', ')})`;
            returningValuesForCondition = [...Object.values(data)];
            break;

        case 'update':
            const setColumns = Object.keys(data).map(key => `${key} = ?`).join(', ');
            query = `UPDATE ${table} SET ${setColumns} ${condition}`;
            returningValuesForCondition =[...Object.values(data)];
            break;

        case 'delete':
            query = `DELETE FROM ${table} ${condition}`;
            break;

        default:
           throw new Error('Azione non valida');
    }
    
    return { query, returningValuesForCondition };
};

export function runQuery(action, table, data = {}, columns = '*', condition = '', valuesForCondition = [], callback) {
    const { query, returningValuesForCondition } = buildQuery(action, table, data, columns, condition, valuesForCondition);
    console.log(query);
    console.log(valuesForCondition)
    executeQuery(query, returningValuesForCondition, callback);
}
*/