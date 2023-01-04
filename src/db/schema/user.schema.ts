import { SchemaFactory } from '@nestjs/mongoose'
import { User } from '../../interface/user.interface'

export const UserSchema = SchemaFactory.createForClass(User)
