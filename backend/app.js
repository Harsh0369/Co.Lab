import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connect from './db/db.js';
import userRoutes from './routes/user.routes.js'

connect();


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

export default app;
    