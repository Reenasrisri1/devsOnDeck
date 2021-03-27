require('dotenv').config();
const cookieParser = require('cookie-parser')

const express = require('express');
const app = express();
require('./config/mongoose.config')(process.env.DB_NAME);
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  credentials:true,
  origin: 'http://localhost:3000',
}));
app.use(cookieParser());
require('./routes/user.routes')(app);
app.listen(process.env.DB_PORT, () => console.log(`Listening on port: ${process.env.DB_PORT}`));
