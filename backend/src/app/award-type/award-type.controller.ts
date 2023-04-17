import type { Request, Response, NextFunction } from 'express';
import { EMessage } from 'rebell-core';
import { ESuccessMessage } from 'rebell-core'
import { Get } from 'rebell-core'
import AwardTypeService from './award-type.service';

class AwardTypeController {

  @Get('')
  public async getAll(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    return new Promise<void>(async () => {
      try {
        const result = await AwardTypeService.findAll()
        if (!result)
          response.json({
            message: EMessage.NOT_FOUND,
            detail: []
          })

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

export default new AwardTypeController();

