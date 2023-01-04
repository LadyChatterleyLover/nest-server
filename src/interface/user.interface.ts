import { Prop, Schema } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema()
export class User extends Document {
  @Prop()
  @ApiProperty({
    description: '用户名',
    example: 'admin',
  })
  readonly username: string

  @Prop()
  @ApiProperty({
    description: '密码',
    example: '123456',
  })
  readonly password: string

  @Prop()
  @ApiProperty({
    description: '手机号',
    example: '18100000000',
  })
  readonly phone: string
}
