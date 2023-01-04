import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { DbModule } from './db/db.module'
import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/auth.service'
import { UserController } from './user/user.controller'

@Module({
  imports: [UserModule, DbModule, AuthModule],
  controllers: [AppController, UserController],
  providers: [AppService, AuthService],
})
export class AppModule {}
