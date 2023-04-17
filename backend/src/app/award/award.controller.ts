import type { Request, Response, NextFunction } from 'express';
import { EMessage, customError } from 'rebell-core';
import { EErrorMessage, EErrorCode, EApp, ESuccessMessage } from 'rebell-core'
import { generateCode, getMethodName, isString } from 'rebell-utils'
import { Get } from 'rebell-core'
import AwardService from './award.service';
import { getPagination, getPagingData } from '../../utils/index.util';

class AwardController {
  @Get(':user_id')
  public async getAwardByUserId(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    return new Promise<void>(async () => {
      try {
        const { user_id } = request.params
        if (!isString(user_id))
          throw customError({
            message: EErrorMessage.INVALID_DATA,
            errorPath: EErrorCode.APP + '-' + EApp.APP_CONTROLLER + '-' + getMethodName(new Error()),
            errorCode: EErrorCode.APP + '-' + EApp.APP_CONTROLLER + '-' + generateCode(4)
          })

        const { page = 0, size = 5, type = '', price = 0 } = request.query;

        const { limit, offset } = getPagination(parseInt(page as string, 10), parseInt(size as string, 10));
        console.log(type.toString())
        const result = await AwardService.findAwardByUserId(user_id, type.toString(), price as number, limit, offset)
        if (!result)
          response.json({
            message: EMessage.NOT_FOUND,
            detail: []
          })

        response.json({
          message: ESuccessMessage.FOUND,
          detail: getPagingData(result, parseInt(page as string, 10), limit)
        })
      } catch (error: any) {
        next(error)
      }
    })
  }
}

export default new AwardController();

