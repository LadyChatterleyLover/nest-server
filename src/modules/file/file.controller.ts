import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileService } from './file.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UploadFile } from '../../interface/file.interface'
import { Readable } from 'node:stream'
import { AuthGuard } from '@nestjs/passport'

/**
 * 将buffer转为Stream流
 * @param binary file.buffer
 * @returns
 */
function bufferToStream(binary) {
  const readableInstanceStream = new Readable({
    read() {
      this.push(binary)
      this.push(null)
    },
  })
  return readableInstanceStream
}

@Controller('file')
@ApiTags('文件模块')
@UseGuards(AuthGuard('jwt'))
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: '文件上传',
  })
  async upload(@UploadedFile() file: UploadFile) {
    const name = file.originalname
    const stream = bufferToStream(file.buffer)
    return this.fileService.upload(name, stream, file)
  }
}
