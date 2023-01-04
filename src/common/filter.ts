import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
    if (status === 401) {
      response.status(status).json({
        message: '请先登录',
        code: 401,
      })
    } else {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().getTime(),
        message: exception['message'],
        method: request.method,
        path: request.url,
      })
    }
  }
}
