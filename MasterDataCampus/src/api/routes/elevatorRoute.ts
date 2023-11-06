import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import config from '../../../config';
import winston = require('winston');
import IElevatorController from '../../controllers/IControllers/IElevatorController';

import ElevatorService from '../../services/elevatorService';
import { IElevatorDTO } from '../../dto/IElevatorDTO';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/elevators', route);

  const ctrl = Container.get(config.controllers.elevator.name) as IElevatorController;
  route.post(
    '',
    celebrate({
      body: Joi.object({
        buildingName: Joi.string().required(),
        floors: Joi.array().items(
          Joi.string().required(),
        ),
      }),
    }),
     (req, res, next) => ctrl.createElevator(req, res, next));

  route.put('',
  celebrate({
    body: Joi.object({
      id: Joi.string().required(),
      buildingName: Joi.string().required(),
      floors: Joi.array().items(
          Joi.string().required(),
      ),
    }),
  }),
    (req, res, next) => ctrl.updateElevator(req, res, next));

  // Define other routes for elevator operations here
/*   route.get('',   celebrate({
    body: Joi.object({    
      buildingName: Joi.string().required(),   
    }),
  }), (req, res, next) => ctrl.getElevatorsInBuilding(req, res, next)); */
/*   route.get('/list',   celebrate({
    body: Joi.object({    
      buildingName: Joi.string().required(),   
    }),
  }), (req, res, next) => ctrl.getFloorsServedByElevatorsInBuilding(req, res, next)); */
  route.get('/:buildingName', (req, res, next) => { ctrl.getElevatorsInBuilding(req, res, next); req.params.buildingName; } );
  route.get('/:buildingName', (req, res, next) => { ctrl.getFloorsServedByElevatorsInBuilding(req, res, next); req.params.buildingName; } );

};
