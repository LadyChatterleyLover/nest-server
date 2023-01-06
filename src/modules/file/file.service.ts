import { ContextType, Injectable } from '@nestjs/common'
import { File, UploadFile } from '../../interface/file.interface'
import * as OSS from 'ali-oss'
import { Readable } from 'node:stream'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import client from '../../config/oss'

@Injectable()
export class FileService {
  public client
  constructor(
    @InjectModel('FILE_MODEL') private readonly fileModel: Model<File>,
  ) {
    this.client = new OSS(client)
  }
  async upload(
    name: string,
    stream: Readable,
    file: UploadFile,
    user_id: string,
  ) {
    const size = file.size
    const ext = file.mimetype.split('/')[1]
    const url = await this.uploadFile(name, stream)
    const res = await this.fileModel.create({
      name,
      size,
      ext,
      url,
      user_id,
    })
    if (res) {
      return {
        code: 200,
        msg: '上传成功',
        data: res,
      }
    } else {
      return {
        code: 500,
        msg: '上传失败',
      }
    }
  }

  async uploadFile(name: string, stream: Readable) {
    let res
    try {
      res = await this.client.putStream(name, stream)
      // 将文件设置为公共可读
      await this.client.putACL(name, 'public-read')
    } catch (error) {
      console.log(error)
    }
    return res.url
  }
}
