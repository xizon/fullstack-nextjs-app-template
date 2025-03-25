import { NestFactory } from '@nestjs/core';
import { PhpModule } from './core/php/php.module';
import { LANG, PORT } from './core/php/constants';

async function bootstrap() {
  const app = await NestFactory.create(PhpModule);
  

  // CORS
  app.enableCors();

  //
  const server = await app.listen(PORT);
  const address = server.address();
  console.log(LANG.en.serverRun, address.address, address.port);
}
bootstrap();