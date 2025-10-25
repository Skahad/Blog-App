import express from 'express';
import dotenv from 'dotenv'
import Connection from './database/db.js';
import Router from './routes/route.js'
import cors from 'cors'
import bodyParser from 'body-parser';

dotenv.config()

const app = express();
app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))


app.use('/',Router)

const PORT = process.env.PORT || 8000

app.listen( PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
})

const Username = process.env.DB_USERNAME
const Password = process.env.DB_PASSWORD

Connection(Username, Password)