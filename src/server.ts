import http from 'http';

import app from './app/app';
import { env } from './config';
import connectDatabase from './config/db';
const server = http.createServer(app);

const main = async () => {
    try {
        await connectDatabase();
        server.listen(env.port, () => {
            console.log(`Server is listening on port ${env.port}`);
            console.info(`Check health http://localhost:${env.port}/health`);
        });
    } catch (error) {
        console.log(error);
    }
};

main();

process.on('unhandledRejection', () => {
    console.log('unhandledRejection found, shutting down..');
    server.close(() => {
        process.exit(1);
    });
});

process.on('uncaughtException', () => {
    console.log(`uncaughtException found , shutting down ...`);
    process.exit(1);
});
