import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import config from '../../../config';
import winston = require('winston');
import IRoomController from '../../controllers/IControllers/IRoomController';

import RoomService from '../../services/roomService';
import  IRoomDTO  from '../../dto/IRoomDTO';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/rooms', route);

  const ctrl = Container.get(config.controllers.room.name) as IRoomController;
  route.post(
    '',
    celebrate({
      body: Joi.object({

        category: Joi.string().required(),
        description: Joi.string().required(),
        floor: Joi.string().required()
      }),
    }),
     (req, res, next) => ctrl.createRoom(req, res, next));

  route.put('',
  celebrate({
    body: Joi.object({
      id: Joi.string().required(),
      category: Joi.string().required(),
      description: Joi.string().required(),
      floor: Joi.string().required()
    }),
  }),
    (req, res, next) => ctrl.updateRoom(req, res, next));

  // Define other routes for building operations here
  //route.get('', (req, res, next) => ctrl.getallRooms(req, res, next));

};