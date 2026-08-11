import Redis from 'ioredis';

let redis;
if (!global._redis) {
  global._redis = new Redis(process.env.KV_REDIS_URL);
}
redis = global._redis;

export default redis;