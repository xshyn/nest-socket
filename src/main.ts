import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { RedisIoAdapter } from './adapters/redis-io.adapter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // adapter config
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
