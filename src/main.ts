import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
// import { setupSwagger } from 'swaggerConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = parseInt(configService.get('PORT')) || 4000;
  // await setupSwagger(app);
  await app.listen(PORT);
  console.log(`Server has started on port ${PORT}`);
}
bootstrap();
