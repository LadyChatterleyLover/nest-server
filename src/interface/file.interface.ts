import { Prop, Schema } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema()
export class File extends Document {
  @Prop()
  @ApiProperty({
    description: '文件名',
    example: '',
  })
  readonly name: string

  @Prop()
  @ApiProperty({
    description: '文件扩展名',
    example: '',
  })
  readonly ext: string

  @Prop({ type: Types.ObjectId, ref: 'User' })
  @ApiProperty({
    description: '用户id',
    example: '',
  })
  readonly user_id: string

  @Prop({ default: 0 })
  @ApiProperty({
    description: '文件大小',
    example: 0,
  })
  readonly size: number

  @Prop()
  @ApiProperty({
    description: '图片真实url',
    example: 0,
  })
  readonly url: string

  @Prop({ default: Date.now() })
  @ApiProperty({
    description: '创建时间',
    example: Date.now(),
  })
  readonly create_time: string

  @Prop({ default: Date.now() })
  @ApiProperty({
    description: '修改时间',
    example: Date.now(),
  })
  readonly update_time: string
}

export interface UploadFile {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  size: number
  buffer: Buffer
}
