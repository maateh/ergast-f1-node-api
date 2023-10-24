const db = require('./database/mysql')

const getAllCircuits = async () => {
  const query = 'SELECT * FROM circuits'

  return db.execute(query)
    .then(([circuits]) => {
      console.log(circuits)
      return circuits
    })
    .catch(err => {
      console.error('Query error: ', err)
    })
}

module.exports = {
  getAllCircuits
}
