import express from 'express';
import * as dotenv from 'dotenv';
// import generateRoute from '../src/routes/generate';
// import saveRoute from '../src/routes/save';
import healthRoute from '../src/routes/health';

dotenv.config();

const app = express();
app.use(express.json());

// app.use('/generate', generateRoute);
// app.use('/save', saveRoute);
app.use('/health', healthRoute);

export default app;