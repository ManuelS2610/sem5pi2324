import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import config from '../../../config';
import winston = require('winston');
import IBuildingController from '../../controllers/IControllers/IBuildingController';

import BuildingService from '../../services/buildingService';
import { IBuildingDTO } from '../../dto/IBuildingDTO';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/buildings', route);

  const ctrl = Container.get(config.controllers.building.name) as IBuildingController;
  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        buildingId: Joi.string().required(),
        description: Joi.string().required()
      }),
    }),
     (req, res, next) => ctrl.createBuilding(req, res, next));

  route.put('/update',
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      buildingId: Joi.string().required(),
      description: Joi.string().required()
    }),
  }),
    (req, res, next) => ctrl.updateBuilding(req, res, next));

  // Define other routes for building operations here

};
