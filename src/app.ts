import dotenv from 'dotenv';

import connectDB from './utils/database';
import { server } from './utils/socket';

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log("Succesfully connected to database.");
    server.listen(PORT, () => {
      console.log('Server is up and running...');
    })
  })
  .catch((err) => {
    console.log(err.message);
  })
