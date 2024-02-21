import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import connectDB from './utils/database';
import allRoutes from './routes/all';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: '*', // Allow any specified HTTP methods
  allowedHeaders: '*' // Allow any specified headers
}));
app.use(helmet());

// routes
app.use('/api/v1', allRoutes);

connectDB()
  .then(() => {
    console.log("Succesfully connected to database.");
    app.listen(PORT, () => {
      console.log('Server is up and running...');
    })
  })
  .catch((err) => {
    console.log(err.message);
  })
