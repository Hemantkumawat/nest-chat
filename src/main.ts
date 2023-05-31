import { NestFactory } from '@nestjs/core';
import { AppModule } from './root.module';
import { ValidationPipe } from './common/validation.pipe';
import { config } from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Apply the validation pipe globally
    app.useGlobalPipes(new ValidationPipe());
    config();
    await app.listen(3000);
}
bootstrap();
