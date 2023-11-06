import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRobotTypeController from "./IControllers/IRobotTypeController";
import IRobotTypeService from '../services/IServices/IRobotTypeService';
import IRobotTypeDTO from '../dto/IRobotTypeDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class RobotTypeController implements IRobotTypeController {
  constructor(
      @Inject(config.services.robotType.name) private robotTypeServiceInstance : IRobotTypeService
  ) {}

  public async createType(req: Request, res: Response, next: NextFunction) {
    try {
      const robotTypeOrError = await this.robotTypeServiceInstance.createType(req.body as IRobotTypeDTO) as Result<IRobotTypeDTO>;
        
      if (robotTypeOrError.isFailure) {
        return res.status(402).send();
      }

      const robotTypeDTO = robotTypeOrError.getValue();
      return res.json( robotTypeDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateType(req: Request, res: Response, next: NextFunction) {
    try {
      const robotTypeOrError = await this.robotTypeServiceInstance.updateType(req.body as IRobotTypeDTO) as Result<IRobotTypeDTO>;

      if (robotTypeOrError.isFailure) {
        return res.status(404).send();
      }

      const robotTypeDTO = robotTypeOrError.getValue();
      return res.status(201).json( robotTypeDTO );
    }
    catch (e) {
      return next(e);
    }
  };
}
