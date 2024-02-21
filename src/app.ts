import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import connectDB from './utils/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*', // Allow requests from any origin
    methods: '*', // Allow any specified HTTP methods
    allowedHeaders: '*' // Allow any specified headers
  }));
app.use(helmet());


connectDB()
  .then(() => {
      console.log("Succesfully connected to database.");
      app.listen(PORT, (): void => {
        console.log('Server is up and running...');
      })
    }
  )
  .catch((err) => {
    console.log(err.message);
  })
