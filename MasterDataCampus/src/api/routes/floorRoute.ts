import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import config from '../../../config';
import winston = require('winston');
import IFloorController from '../../controllers/IControllers/IFloorController';

import FloorService from '../../services/floorService';
import  IFloorDTO  from '../../dto/IFloorDTO';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/floors', route);

  const ctrl = Container.get(config.controllers.floor.name) as IFloorController;
  route.post(
    '',
    celebrate({
      body: Joi.object({

        name: Joi.string().required(),
        buildingName: Joi.string().required(),
        description: Joi.string().required()
      }),
    }),
     (req, res, next) => ctrl.createFloor(req, res, next));

  route.put('',
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
  route.get('/allFloors', (req, res, next) => ctrl.getallFloors(req, res, next));

  route.get('/passages', (req, res, next) => ctrl.findFloorsWithPassages(req, res, next));

  route.get('/:buildingName', (req, res, next) => { ctrl.findFloorsByBuildingName(req, res, next); req.params.buildingName; } );



  route.patch('',
  celebrate({
    body: Joi.object({
      id: Joi.string().required(),
      map: Joi.array().items(
        Joi.array().items(Joi.number())
      ).required(),
      passages: Joi.array().items(
        Joi.object({
          id: Joi.string().required(),
          positionBuilding1: Joi.array().items(
            Joi.number().required()
          ).required(),
          positionBuilding2: Joi.array().items(
            Joi.number().required()
          ).required()
        })
      ).required(),
      elevator:
        Joi.object(
          {
            id: Joi.string().required(),
            position: Joi.array().items(
              Joi.number().required()
            ).required()
          }
        )
      .required(),
      rooms: Joi.array().items(
        Joi.object(
          {
            id: Joi.string().required(),
            position: Joi.array().items(
              Joi.number().required()
            ).required(),
            distX: Joi.number().required(),
            distY: Joi.number().required(),
          }
        )
      ).required()
    })
  }),
    (req, res, next) => ctrl.loadMap(req, res, next),
    );
};
