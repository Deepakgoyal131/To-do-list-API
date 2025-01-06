const express = require('express');
const app = express();

app.use(express.json());

require('dotenv').config();
const port = process.env.PORT || 4000;

const db = require('./database');
db(process.env.DBLINK);

app.use('/todolist',require('./routes/userRoutes'));
app.use('/todolist',require('./routes/taskRoute'));

app.listen(port,()=>{
    console.log(`The server is running on PORT: ${port}`);
})