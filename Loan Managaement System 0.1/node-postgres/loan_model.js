const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'root',
  port: 5432,
});

const getLoans = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM loans ORDER BY l_id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}
const createLoan = (body) => {
  return new Promise(function(resolve, reject) {
    const { b_id, agent, amount, loan_term, date, status, interest_rate, balance, branch } = body
    pool.query('INSERT INTO loans (b_id, agent, amount, loan_term, date, status, interest_rate, balance, branch) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [b_id, agent, amount, loan_term, date, status, interest_rate, balance, branch], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new loan has been added: ${results.rows[0]}`)
    })
  })
}
const deleteLoan = () => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM loans WHERE l_id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Loan deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getLoans,
  createLoan,
  deleteLoan,
}