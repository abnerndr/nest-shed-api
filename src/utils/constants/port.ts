import 'dotenv/config';

const PORT = process.env.PORT || 3333;
const HOST = `http://localhost:${PORT}`;
const LOGGER_HOST = `[NestApplication] Server is running in ${HOST}`;
export { PORT, HOST, LOGGER_HOST };
