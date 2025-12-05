"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import checkoutRoute from '../src/routes/checkout';
// import confirmRoute from '../src/routes/confirm';
// import webhookRoute from '../src/routes/webhook';
// import healthRoute from '../src/routes/confirm';
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use('/checkout', checkoutRoute);
// app.use('/confirm', confirmRoute);
// app.use('/webhook', webhookRoute);
// app.use('/health', healthRoute);
exports.default = app;
