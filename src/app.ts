import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

import itemsRouter from './routes/itemsRouter';

const app = express();

app.use(json());
app.use('/items', itemsRouter);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);
