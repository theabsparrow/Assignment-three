import express, { Request, Response } from 'express';
import cors from 'cors';
import config from './config';
import globalErrorHandler from './middlewire/globalErrorHandler';
import notFound from './middlewire/notfound';
import router from './router';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', router);

const runningServer = async (req: Request, res: Response) => {
  const serverdata = `server is running on port ${config.port}`;
  res.send(serverdata);
};
app.get('/', runningServer);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
