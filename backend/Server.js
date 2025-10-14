import express from 'express';
import cors from 'cors';
import connectDB from './src/config/database.js';

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

