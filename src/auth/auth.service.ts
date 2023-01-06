// src/logical/auth/auth.service.ts
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '../interface/user.interface'
import { checkPassword } from 'src/utils/cryptogram'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userModel.findOne({ username })
    const userPassword = user.password
    const checked = await checkPassword(password, userPassword)
    if (checked) {
      if (user) {
        return {
          code: 1,
          user,
        }
      }
    } else {
      return {
        code: 2,
        user: null,
      }
    }
    // 查无此人
    return {
      code: 3,
      user: null,
    }
  }

  async certificate(user: User): Promise<any> {
    try {
      const res = JSON.parse(JSON.stringify(user))
      delete res.password
      const token = this.jwtService.sign(res)
      return {
        code: 200,
        data: {
          token,
          user: res,
        },
        msg: `登录成功`,
      }
    } catch (error) {
      return {
        code: 600,
        msg: `账号或密码错误`,
      }
    }
  }
}
