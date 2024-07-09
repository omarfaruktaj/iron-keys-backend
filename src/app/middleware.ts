import cors from 'cors';
import express from 'express';

const middleware = [cors(), express.json({ limit: '2mb' })];

export default middleware;
