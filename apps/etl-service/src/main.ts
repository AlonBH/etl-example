import * as express from 'express';
import * as cors from 'cors';
import { etlRouter } from './app/routes/etl';

const app = express();
app.use(cors());

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to etl-service!' });
});

app.use('/api/download', etlRouter);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
