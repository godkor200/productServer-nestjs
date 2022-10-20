import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { initSwagger } from '@utils/initSwagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /** class-transformer 적용 */
  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * whitelist: DTO에 없은 속성은 무조건 거른다.
       * forbidNonWhitelisted: 전달하는 요청 값 중에 정의 되지 않은 값이 있으면 Error를 발생합니다.
       * transform: 네트워크를 통해 들어오는 데이터는 일반 JavaScript 객체입니다.
       *            객체를 자동으로 DTO로 변환을 원하면 transform 값을 true로 설정한다.
       * disableErrorMessages: Error가 발생 했을 때 Error Message를 표시 여부 설정(true: 표시하지 않음, false: 표시함)
       *                       배포 환경에서는 true로 설정하는 걸 추천합니다.
       */
      whitelist: true,
      transform: true,
    }),
  );
  /** swagger 적용 */
  initSwagger(app);
  await app.listen(3000);
}
bootstrap();
