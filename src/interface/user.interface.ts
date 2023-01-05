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

  readonly phone: string

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
