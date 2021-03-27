const mongoose = require('mongoose');
//const db_name = 'petShelter';

module.exports = ()=>{
mongoose
  .connect(`mongodb://localhost/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(`Established a connection to the database: ${process.env.DB_NAME}`)
  )
  .catch((err) =>
    console.log(`Something went wrong when connecting to the database : ${err}`)
  );

}
