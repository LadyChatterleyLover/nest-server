import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './modules/user/user.module'
import { DbModule } from './db/db.module'
import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/auth.service'
import { UserController } from './modules/user/user.controller'
import { FileModule } from './modules/file/file.module'

@Module({
  imports: [DbModule, AuthModule, FileModule, UserModule],
  controllers: [AppController, UserController],
  providers: [AppService, AuthService],
})
export class AppModule {}
