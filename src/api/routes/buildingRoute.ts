import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import config from '../../../config';
import winston = require('winston');
import IBuildingController from '../../controllers/IControllers/IBuildingController';

import BuildingService from '../../services/buildingService';
import  IBuildingDTO  from '../../dto/IBuildingDTO';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/buildings', route);

  const ctrl = Container.get(config.controllers.building.name) as IBuildingController;
  route.post('',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        depth: Joi.number().required(),
        width: Joi.number().required()
      })
    }),
     (req, res, next) => ctrl.createBuilding(req, res, next));

  route.put('',
  celebrate({
    body: Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      depth : Joi.number().required(),
      width : Joi.number().required()
    }),
  }),
    (req, res, next) => ctrl.updateBuilding(req, res, next));

  // Define other routes for building operations here
//method to list all buildings
  route.get('', (req, res, next) => ctrl.getallBuildings(req, res, next));
};
