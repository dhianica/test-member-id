import type { Request, Response, NextFunction } from 'express';
import { EMessage, customError } from 'rebell-core';
import { EErrorMessage, EErrorCode, EApp, ESuccessMessage } from 'rebell-core'
import { generateCode, getMethodName, isString } from 'rebell-utils'
import { Get } from 'rebell-core'
import UserService from './user.service';

class UserController {
  @Get(':user_email')
  public async getUserByEmail(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    return new Promise<void>(async () => {
      try {
        const { user_email } = request.params
        if (!isString(user_email))
          throw customError({
            message: EErrorMessage.INVALID_DATA,
            errorPath: EErrorCode.APP + '-' + EApp.APP_CONTROLLER + '-' + getMethodName(new Error()),
            errorCode: EErrorCode.APP + '-' + EApp.APP_CONTROLLER + '-' + generateCode(4)
          })
        const result = await UserService.findByEmail(user_email)
        if (!result)
          response.json({
            message: EMessage.NOT_FOUND,
            detail: []
          })
        else
          response.json({
            message: ESuccessMessage.FOUND,
            detail: result
          })
      } catch (error: any) {
        next(error)
      }
    })
  }
}

export default new UserController();

