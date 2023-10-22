import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import config from '../../../config';
import winston = require('winston');
import IFloorController from '../../controllers/IControllers/IFloorController';

import FloorService from '../../services/floorService';
import { IFloorDTO } from '../../dto/IFloorDTO';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/floors', route);

  const ctrl = Container.get(config.controllers.floor.name) as IFloorController;
  route.post(
    '/create',
    celebrate({
      body: Joi.object({

        name: Joi.string().required(),
        buildingName: Joi.string().required(),
        description: Joi.string().required()
      }),
    }),
     (req, res, next) => ctrl.createFloor(req, res, next));

  route.put('/update',
  celebrate({
    body: Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      buildingName: Joi.string().required(),
      description: Joi.string().required()
    }),
  }),
    (req, res, next) => ctrl.updateFloor(req, res, next));

  // Define other routes for building operations here

};
