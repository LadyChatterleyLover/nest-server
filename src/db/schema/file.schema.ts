import { SchemaFactory } from '@nestjs/mongoose'
import { File } from '../../interface/file.interface'

export const FileSchema = SchemaFactory.createForClass(File)
