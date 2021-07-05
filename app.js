import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from 'config';

import routes from './src/routes';

require('dotenv').config();

const app = express();

const port = config.get('port') || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(config.get('mongoUri'), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

routes(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
