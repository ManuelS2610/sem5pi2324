import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import config from '../../../config';
import winston = require('winston');
import IRobotController from '../../controllers/IControllers/IRobotController';

import RobotService from '../../services/robotService';
import  IRobotDTO  from '../../dto/IRobotDTO';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/robots', route);

  const ctrl = Container.get(config.controllers.robot.name) as IRobotController;
  route.post(
    '',
    celebrate({
      body: Joi.object({

        type: Joi.string().required(),
        designation: Joi.string().required(),
        serialNumber: Joi.string().required(),
        description: Joi.string().required(),
        available: Joi.boolean().required()
      }),
    }),
     (req, res, next) => ctrl.createRobot(req, res, next));

  route.put('',
  celebrate({
    body: Joi.object({
      id: Joi.string().required(),
      type: Joi.string().required(),
      designation: Joi.string().required(),
      serialNumber: Joi.string().required(),
      description: Joi.string().required(),
      available: Joi.boolean().required()
    }),
  }),
    (req, res, next) => ctrl.updateRobot(req, res, next));

  // Define other routes for building operations here
  //route.get('', (req, res, next) => ctrl.getallRobots(req, res, next));

};