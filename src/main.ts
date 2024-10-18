import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware';
// import { WraprDataInterceptor } from './common/interceptors/wrapr-data.interceptor';
// import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
// import { CustomExcrptionFilter } from './common/filters/custom-excrption/custom-excrption.filter';
// import { AuthGuard } from './common/guards/auth/auth.guard';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // سيتم تطبيق ال vlaidate على مستوى التطبيق بالكامل
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // سيتم تطبيق ال filter على مستوى التطبيق بالكامل
  //app.useGlobalFilters(new CustomExcrptionFilter());

  // سيتم تطبيق ال interceptor على مستوى التطبيق بالكامل
  // app.useGlobalInterceptors(
  //   new WraprDataInterceptor(),
  //   new TimeoutInterceptor(),
  // );

  // طريقة اخري لتطبيق ال middleware
  //app.use(new LoggerMiddleware());

  await app.listen(3000);
}
bootstrap();
