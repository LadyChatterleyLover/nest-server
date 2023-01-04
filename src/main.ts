import { NestFactory } from '@nestjs/core'
import { AllExceptionsFilter } from './common/filter'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('全栈商场系统')
    .setDescription('全栈商场系统接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
  app.useGlobalFilters(new AllExceptionsFilter())
  await app.listen(8888)
}
bootstrap()
