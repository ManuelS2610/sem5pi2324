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


  route.get('/allRooms', (req, res, next) => ctrl.getAllRooms(req, res, next));
  route.get('/:floor', (req, res, next) => {ctrl.getRoomsByFloor(req, res, next); req.params.floor; } );

};