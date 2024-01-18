import pg from 'pg'

const pool = new pg.Pool()
 
export const query = (text, params, callback) => pool.query(text, params, callback)