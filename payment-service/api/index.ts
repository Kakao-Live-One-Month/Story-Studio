import express from 'express';
// import checkoutRoute from '../src/routes/checkout';
// import confirmRoute from '../src/routes/confirm';
// import webhookRoute from '../src/routes/webhook';
// import healthRoute from '../src/routes/confirm';

const app = express();
app.use(express.json());

// app.use('/checkout', checkoutRoute);
// app.use('/confirm', confirmRoute);
// app.use('/webhook', webhookRoute);
// app.use('/health', healthRoute);

export default app;