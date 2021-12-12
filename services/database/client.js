import { Client } from 'pg';
import config from '../config';

const dbClient = new Client(config.db);

export default dbClient;