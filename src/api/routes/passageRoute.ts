import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import config from '../../../config';
import winston = require('winston');
import IPassageController from '../../controllers/IControllers/IPassageController';

import PassageService from '../../services/passageService';
import { IPassageDTO } from '../../dto/IPassageDTO';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/passage', route);

  const ctrl = Container.get(config.controllers.passage.name) as IPassageController;
  route.post('',
    celebrate({
      body: Joi.object({
        building1: Joi.string().required(),
        building2: Joi.string().required(),
        pisobuilding1: Joi.string().required(),
        pisobuilding2: Joi.string().required(),
      }),
    }),
     (req, res, next) => ctrl.createPassage(req, res, next));

  route.put('',
  celebrate({
    body: Joi.object({
        id: Joi.string().required(),
        building1: Joi.string().required(),
        building2: Joi.string().required(),
        pisobuilding1: Joi.string().required(),
        pisobuilding2: Joi.string().required(),

    }),
  }),
    (req, res, next) => ctrl.updatePassage(req, res, next));

  

};
