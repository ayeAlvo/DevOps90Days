require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');
const Redis = require('ioredis');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'postgres',
  port: 5432,
});

const redis = new Redis({
  host: process.env.REDIS_HOST || 'redis',
  port: 6379,
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    res.json({ status: 'ok', db: true });
  } catch (err) {
    res.status(500).json({ status: 'error', db: false });
  }
});

app.get('/cache', async (req, res) => {
  try {
    await redis.set('test', 'ok');
    const value = await redis.get('test');
    res.json({ status: 'ok', cache: value === 'ok' });
  } catch (err) {
    res.status(500).json({ status: 'error', cache: false });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});